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
    // if cached version exists, serve it's response
    // else fetch the remote version, cache it and serve it's response

    // remember, if you need to use a request or a response more than once, clone it first.
}

/**
 * @param  {string}   cacheName
 * @param  {Request}  request
 * @param  {Response} response
 * @return {Response} The response object we passed in
 */
function cacheResponse(cacheName, request, response) {
    console.info('Caching', request.url, 'in', cacheName);

    caches.open(cacheName)
        .then((cache) => cache.put(request, response.clone()));

    return response;
}