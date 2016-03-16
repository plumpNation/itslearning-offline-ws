/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// Adjust this version and watch the effect it has on the workers when you refresh, then
// close the browser tab.
let version = 'v1-workshop-exercise-2';

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



    // if cached version exists, respond with it
    // else fetch the request, cache it and respond with the response
});

function getCached(request) {
    let foundCachedResponse =
            caches.match(request)
                .then((response) => );

    return new Response(myNews);
}

function cacheResponse(cacheName, request, response) {
    // return caches.open(cacheName)
        .put(request.clone)
}
