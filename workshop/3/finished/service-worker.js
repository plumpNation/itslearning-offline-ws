let version = 'v1-cache-api';

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

    // Since we are going to take over the request/response by calling
    // event.respondWith, we must manually fetch the request.
    let fetchedNews =

            // Use a clone of the request object, so we can use it again.
            fetch(event.request.clone())

                // fetch returns a Promise
                .then(function (response) {

                    // Use a clone of the response object as we will use it again
                    // in `event.respondWith()`
                    cacheResponse(event.request, response.clone());

                    // So the end result of this fetch then chain is that fetchedNews will be
                    // a Promise that resolves to this response;
                    return response;
                });

    // NOTE: Called synchronously
    event.respondWith(fetchedNews);
});

function cacheResponse(request, response) {
    caches.open(version)
        .then(function (cache) {
            console.info('Caching -->', request.url, '<--');
            cache.put(request, response);
        });
}
