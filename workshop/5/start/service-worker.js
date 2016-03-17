let version = 'v1-caching-page-assets',

    // The files we want to cache
    whitelist = [
        './'
        // add your whitelist items here
    ];

console.info('Executing service worker for', version);

self.addEventListener('install', (event) => {
    // you will add your whitelist to the cache here

    console.info(version, 'installing');

    // it's a good idea to wait for the caching to finish
    // event.waitUntil(cachesAreWritten);
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    console.info(version, 'requesting', event.request.url);

    if (!event.request.url.endsWith('news.json')) {
        // returning undefined will not change the response or request.
        return;
    }

    // Since we are taking control of the request, we will have to provide a response.
    event.respondWith(fetchCachePriority(version, event.request));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  HELPERS  //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


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
