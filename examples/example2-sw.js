/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// The files we want to cache
var CACHE_NAME = 'example2',

    urlsToCache = [
        '/examples/2/',
        '/examples/2/app.js'
    ];

// Set the callback for the install step
self.addEventListener('install', function (event) {
    var filesAreCached =
            caches
                .open(CACHE_NAME)
                .then(function (cache) {
                    console.info('Opened cache', CACHE_NAME);

                    return cache.addAll(urlsToCache);
                })
                .catch(function (err) {
                    console.error(err);
                });

    event.waitUntil(filesAreCached);
});

self.addEventListener('fetch', function(event) {
    var filesFoundInCache =
            caches
                .match(event.request)
                .then(function (response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }

                    // no hit, allow the request through to try and hit the network
                    return fetch(event.request);
                })
                .catch(function (err) {
                    console.error(err);
                });

  event.respondWith(filesFoundInCache);
});
