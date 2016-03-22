let version = 'v1-returning-cached-data';

console.info('Executing service worker for', version);

self.addEventListener('install', (event) => {
    console.info(version, 'installing');
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    console.info(version, 'requesting', event.request.url);

    if (!event.request.url.endsWith('news.json')) {
        return;
    }

    let fetchedNews =
            fetch(event.request.clone())
                .then(function (response) {

                    cacheResponse(event.request, response.clone());

                    return response;
                });

    // fetch the request, cache it and respond with the response

    event.respondWith(fetchedNews);
});

function cacheResponse(request, response) {
    caches.open(version)
        .then(function (cache) {
            cache.put(request, response);
        });
}
