let version = 'v1-returning-cached-data';

console.info('Executing service worker for', version);

self.addEventListener('install', (event) => {
    console.info(version, 'installing');
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    let fetchedNews,
        newsPath = new Request('news.json').url;

    console.info(version, 'requesting', event.request.url);

    if (event.request.url !== newsPath) {
        return;
    }

    fetchedNews =
            fetch(event.request.clone())
                .then(function (response) {

                    caches.open(version)
                        .then((cache) => cache.put(event.request, response));

                    return response.clone();
                });

    event.respondWith(fetchedNews);
});
