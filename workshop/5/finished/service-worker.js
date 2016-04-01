let version = 'v1-retrieving-cached-assets',

    // The files we want to cache
    whitelistURLs = [
        './',
        'css/pure/pure-min.css',
        'css/pure/grids-responsive-min.css',
        'css/news.css',
        'css/components/network-indicator.css',

        'img/kingsman-logo.png',
        'img/avatars/gavin.png',

        'lib/network-indicator.js',
        'lib/news-helper.js',

        'app.js',
    ];

console.info('Executing service worker for', version);

self.addEventListener('install', (event) => {
    let whitelistCached =
            caches.open(version)
                .then((cache) => cache.addAll(whitelistURLs));

    event.waitUntil(whitelistCached);
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    let newsPath = new Request('news.json').url;

    console.info(version, 'requesting', event.request.url);

    if (!inWhitelist(event.request.url) &&
        event.request.url !== newsPath) {
        return;
    }

    let fetchedRequest =

            // Look for a match in the CacheStorage
            // NOTE: we don't need to `open` a specific cache
            caches.match(event.request)
                .then((cachedResponse) => {

                    // if a cached version exists, let's just return it
                    if (cachedResponse) {
                        console.info('Cache found', event.request.url);
                        return cachedResponse;
                    }

                    // if not, we can use the code from the last workshop to do the network
                    // request and then cache and return the response.
                    return fetchAndCache(event.request.clone());
                });

    event.respondWith(fetchedRequest);
});

function fetchAndCache(request) {
    console.info('Fetching from network', request.url);

    return fetch(request)
        .then(function (response) {
            console.info('Caching', request.url);

            caches.open(version)
                .then((cache) => cache.put(request, response));

            return response.clone();
        });
}

/**
 * @param  {string} requestURL
 * @return {boolean} true if the requestURL ends with anything in the whitelist.
 */
function inWhitelist(requestURL) {
    return whitelistURLs.some((whitelistURL) => {
        let request = new Request(whitelistURL);

        return requestURL === request.url;
    });
}
