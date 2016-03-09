/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// The files we want to cache
var version     = 'v1',

    urlsToCache = [
        '/examples/2/',
        '/examples/2/app.js',
        '/examples/2/styles.css'
    ],

    updateCacheUrls = function (cache) {
        console.info(version, 'Opened cache');

        return cache.addAll(urlsToCache);
    },

    removeOldCaches = function (keyList) {
        var toRemovals = function (key) {
                if (version !== key) {
                    return caches.delete(key);
                }
            },

            oldCachesAreRemoved = keyList.map(toRemovals);

        return Promise.all(oldCachesAreRemoved);
    },

    addToCache = function (request, response) {
        return function (cache) {
            cache.put(request, response)
        };
    },

    cacheRequestResponse = function (request) {
        return function (response) {
            var responseToCache;

            if (isAShit(response)) {
                return response;
            }

            responseToCache = response.clone();

            caches
                .open(version)
                .then(addToCache(request, responseToCache));

            return response;
        };
    },

    tryToReturnCachedAsset = function (request) {
        return function (response) {
            var fetchRequest;

            // Cache hit - return response
            if (response) {
                return response;
            }

            fetchRequest = event.request.clone();

            // No hit, allow the request through to try and hit the network
            return fetch(fetchRequest)
                .then(cacheRequestResponse(request));
        }
    },

    isAShit = function (response) {
        return !response ||
            response.status !== 200 ||
            response.type !== 'basic'
    },

    handleError = function (err) {
        console.error(version, err);
    };

// Set the callback for the install step
self.addEventListener('install', function (event) {
    var filesAreCached =
            caches
                .open(version)
                .then(updateCacheUrls)
                .catch(handleError);

    event.waitUntil(filesAreCached);
});

self.addEventListener('activate', function (event) {
    var oldCachesRemoved =
            caches
                .keys()
                .then(removeOldCaches)
                .catch(handleError);

    console.info(version, 'activating');

    event.waitUntil(oldCachesRemoved);
});

self.addEventListener('fetch', function (event) {
    var filesFoundInCache =
            caches
                .match(event.request)
                .then(tryToReturnCachedAsset(event.request))
                .catch(handleError);

    event.respondWith(filesFoundInCache);
});
