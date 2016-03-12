/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// Adjust this version and watch the effect it has on the workers when you refresh, then
// close the browser tab.
var version = 'v2-lifecycle-example';

console.log('Running Service Worker', version);

self.addEventListener('install', (event) => {
    var offlineRequest = new Request('./offline.html'),

        offlineContentCached =
            fetch(offlineRequest).then((response) => {
                return caches.open(version)
                    .then((cache) => cache.put(offlineRequest, response));
            });

    console.info(version, 'installing');

    event.waitUntil(offlineContentCached);
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    console.info(version, 'requesting', event.request.url);

    if (event.request.method === 'GET') {
        var fallbackToCache =
                fetch(event.request)
                    .catch(() => {
                        return caches.open(version);
                    })
                    .then((cache) => cache.match('offline.html'));

        event.respondWith(fallbackToCache);
    }
});
