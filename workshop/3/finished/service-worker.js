/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// Adjust this version and watch the effect it has on the workers when you refresh, then
// close the browser tab.
let version = 'v1-workshop-exercise-3';

console.info('Executing service worker for', version);

self.addEventListener('install', (event) => {
    console.info(version, 'installing');
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    let newsDataResponse,
        requestPath = event.request.url;

    console.info(version, 'requesting', event.request.url);

    if (!requestPath.endsWith('news.json')) {
        // returning undefined will not change the response or request.
        return;
    }

    // Since we are taking control of the request, we will have to provide a response.
    event.respondWith(fetchAndCache(version, event.request));
});

/**
 * Fetches a request, caches the response and returns the original response
 *
 * @param  {Request} request
 * @return {Promise} A Promise that resolves to a Response object.
 */
function fetchAndCache(cacheName, request) {
    // Clone the request; we should only use each instance once
    let requestClone = event.request.clone();

    // by returning the fetch().then() chain we are returning a Promise object
    return fetch(requestClone)
        .then((response) => {
            // We need to clone the response too, as we will use it more than once.
            let responseClone = response.clone();

            // caches.open
            caches.open(cacheName)
                .then((cache) => cache.put(request, responseClone);

            // cache.put is asynchronous but we don't need to wait for the cache to be written,
            // to response, so we can return the response straight away.
            return response;
        });
}
