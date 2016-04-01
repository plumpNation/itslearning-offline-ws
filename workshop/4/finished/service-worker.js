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

            // Look for a match in the CacheStorage
            // NOTE: we don't need to `open` a specific cache
            caches.match(event.request)
                .then((cachedResponse) => {

                    // if a cached version exists, let's just return it
                    if (cachedResponse) {
                        console.info('Cache found. Using it.');
                        return cachedResponse;
                    }

                    // if not, we can use the code from the last workshop to do the network
                    // request and then cache and return the response.
                    console.info('Fetching news from network');

                    return fetch(event.request.clone())
                        .then(function (response) {

                            console.info('Caching news');
                            caches.open(version)
                                .then((cache) => cache.put(event.request, response));

                            return response.clone();
                        });
                });

    event.respondWith(fetchedNews);
});
