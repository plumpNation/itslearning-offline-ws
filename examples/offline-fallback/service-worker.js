let version         = 'v1-offline-fallback',
    offlineTemplate = './offline.html';

console.log('Executing ServiceWorker', version);

self.addEventListener('install', (event) => {
    let offlineRequest = new Request(offlineTemplate),

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
    console.info(version, 'requesting', event.request.url);

    if (event.request.method === 'GET') {
        let fallbackToCache =
            fetch(event.request)
                .catch(() => {
                    return caches.open(version)
                        .then((cache) => cache.match('offline.html'));
                });

        event.respondWith(fallbackToCache);
    }

    // not GET? do nothing then
});
