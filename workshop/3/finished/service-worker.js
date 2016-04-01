let version = 'v1-cache-api';

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

    // Since we are going to take over the request/response by calling
    // event.respondWith, we must manually fetch the request.
    fetchedNews =

            // Use a clone of the request object, so we can use it again.
            fetch(event.request.clone())

                // fetch returns a Promise
                .then(function (response) {

                    // Open the cache (by key) to use it
                    caches.open(version)
                        .then((cache) => cache.put(event.request, response));

                    // Make a .clone() of the response object as the cache open above is async, as
                    // the response that is cached will be used after this.
                    return response.clone();
                });

    // NOTE: Called synchronously
    event.respondWith(fetchedNews);
});
