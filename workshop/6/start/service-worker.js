let version = 'v1-background-sync',

    // The files we want to cache
    whitelistURIs = [
        '/',
        'css/pure/pure-min.css',
        'css/pure/grids-responsive-min.css',
        'css/news.css',
        'css/components/network-indicator.css',
        'lib/news-helper.js',
        'lib/service-worker-helper.js',
        'lib/network-indicator.js',
        'app.js',
        'news.json',
        'img/kingsman-logo.png',
        'img/avatars/gavin.png'
    ];

console.info('Executing service worker for', version);

self.addEventListener('install', (event) => {
    let cachesAreWritten = function () {
        console.info('adding whitelist to cache');

        return caches
            .open(version)
            .then((cache) => cache.addAll(whitelistURIs));
    };

    console.info(version, 'installing');

    event.waitUntil(cachesAreWritten());
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    console.info(version, 'requesting', event.request.url);

    if (!event.request.url.endsWith('news.json') &&
        !inWhitelist(event.request.url)
    ) {
        return;
    }

    // Since we are taking control of the request, we will have to provide a response.
    event.respondWith(fetchCachePriority(version, event.request));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  HELPERS  //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param  {string} requestURI
 * @return {boolean} true if the requestURI ends with anything in the whitelist.
 */
function inWhitelist(requestURI) {
    return whitelistURIs.some((whitelistURI) => {
        return requestURI.endsWith(whitelistURI);
    });
}

/**
 * Fetches a request, caches the response and returns the original response
 *
 * @param  {string} cacheName
 * @param  {Request} request
 * @return {Promise} A Promise that resolves to a Response object.
 */
function fetchCachePriority(cacheName, request) {
    let requestClone = request.clone();

    return caches.match(request)
        .then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetchAndCache(cacheName, requestClone);
        });

}

function fetchAndCache(cacheName, request) {
    return fetch(request)
        .then((response) => cacheResponse(cacheName, request, response));
}

/**
 * @param {string}   cacheName
 * @param {Request}  request
 * @param {Response} response
 */
function cacheResponse(cacheName, request, response) {
    // We need to clone the response too, as we will use it more than once.
    let responseClone = response.clone();

    console.info('Caching', request.url, 'in', cacheName);

    caches.open(cacheName)
        .then((cache) => cache.put(request, responseClone));

    return response;
}
