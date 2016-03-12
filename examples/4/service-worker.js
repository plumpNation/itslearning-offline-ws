var version         = 'v1-offline-fallback',
    offlineTemplate = './offline.html';

console.log('Executing ServiceWorker', version);

self.addEventListener('install', (event) => {
    var offlineRequest = new Request(offlineTemplate),

        offlineContentCached =
            caches.open(version)
                .then((cache) => cache.addAll([offlineTemplate]));

    console.info(version, 'installing');

    event.waitUntil(offlineContentCached);
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    var fallbackToCache;

    console.info(version, 'requesting', event.request.url);

    if (event.request.method !== 'GET') {
        return;
    }

    fallbackToCache =
        fetch(event.request)
            .catch(() => {
                return caches.open(version)
                    .then((cache) => cache.match('offline.html'));
            });

    event.respondWith(fallbackToCache);
});
