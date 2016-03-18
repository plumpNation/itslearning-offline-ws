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
     console.info('Looking for cached data');

     // check the cachestorage for a match
     return caches.match(request)
         .then((cachedResponse) => {
             if (cachedResponse) {
                 console.info('Found cached data');
                 return cachedResponse;
             }

             console.info('Data not found in cache, fetching from network');

             return fetchAndCache(cacheName, request);
         });

 }

 function fetchAndCache(cacheName, request) {
     return fetch(request.clone())
         .then((response) => cacheResponse(cacheName, request, response));
 }

/**
 * @param {string}   cacheName
 * @param {Request}  request
 * @param {Response} response
 */
function cacheResponse(cacheName, request, response) {
    console.info('Caching', request.url, 'in', cacheName);

    caches.open(cacheName)
        .then((cache) => cache.put(request, response.clone()));

    return response;
}