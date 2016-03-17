/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// Adjust this version and watch the effect it has on the workers when you refresh, then
// close the browser tab.
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
        // returning undefined will not change the response or request.
        return;
    }

    // Since we are taking control of the request, we will have to provide a response.
    event.respondWith(fetchAndCache(version, event.request));
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
function fetchAndCache(cacheName, request) {
    return fetch(request.clone())
        .then((response) => cacheResponse(cacheName, request, response));
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

    // cache.put is asynchronous but we don't need to wait for the cache to be written,
    // to response, so we can return the response straight away.
    return response;
}
