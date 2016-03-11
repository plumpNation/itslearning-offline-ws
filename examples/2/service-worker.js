/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// The version should be unique, it's the name for the CacheStorage instance
var VERSION = 'v2-cache-example',

    // The files we want to cache
    whitelist = [
        '/',
        'app.js',
        'offline-detection.js'
    ];

// Set the callback for the install step
self.addEventListener('install', function (event) {
    var urlsAreCached = cacheWhitelist(VERSION, whitelist);

    console.info(VERSION, 'installing');

    event.waitUntil(urlsAreCached);
});

self.addEventListener('activate', function (event) {
    var oldCachesRemoved = removeCaches(VERSION);

    console.info(VERSION, 'activating');

    event.waitUntil(oldCachesRemoved);
});

self.addEventListener('fetch', function (event) {
    var updatedResponse =
            requestFromNetwork(event.request)
                .then(fallbackToCache(event.request, VERSION))
                .then(cacheResponseFor(event.request, VERSION));

    console.info(VERSION, 'fetching', event.request.url);

    event.respondWith(updatedResponse);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////  HELPERS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

var NetworkHelper = {
        GET: function (request) {
            var validateResponse = function (response) {
                if (NetworkHelper.isValid(response)) {
                    return response;
                }

                console.warn('Asset not found on network', response);
            };

            console.info('Requesting network for asset');

            return fetch(request.clone()).then(validateResponse);
        },

        /**
         * Validates an http response
         */
        isValid: function (response) {
            var failed =
                    !response ||
                    response.status !== 200 ||
                    response.type !== 'basic';

            return !failed;
        }
    },

    CacheHelper = {
        GET: function (request) {
            var log = function (response) {
                if (response === undefined) {
                    console.warn('Cached request not found', VERSION);
                    return response;
                }

                console.info('Cached request found', VERSION);
                return response;
            };

            return {
                from: function (cacheName) {
                    return caches.match(request).then(log);
                }
            };
        },

        DELETE: function (key) {
            console.info('Removing cache', key);

            return caches.delete(key);
        },

        PUT: function (request, response) {
            var updateValue = function (cache) {
                return cache.put(request, response.clone());
            };

            return {
                in: function (cacheName) {
                    return caches.open(cacheName).then(updateValue);
                }
            };
        }
    };

function cacheWhitelist(cacheName, whitelist) {
    var addWhitelist = function (cache) {
        cache.addAll(whitelist);
    };

    console.info(cacheName, 'Caching assets', whitelist);

    return caches.open(cacheName).then(addWhitelist);
}

function removeCaches(cacheName) {
    var outCurrentVersion = function (key) {
            return cacheName !== key;
        },

        waitForDeletions = function (deletions) {
            if (!deletions || !deletions.length) {
                return;
            }

            return Promise.all(deletions);
        },

        removeOldCaches = function (keys) {
            keys = keys.filter(outCurrentVersion);

            if (keys.length) {
                return keys.map(CacheHelper.DELETE);
            }
        };

    return caches.keys()
        .then(removeOldCaches)
        .then(waitForDeletions);
}

function cacheResponseFor(request, cacheName) {
    return function (response) {
        console.info(request);

        if (!NetworkHelper.isValid(response)) {
            console.warn('Not caching', response);
            return response;
        }

        console.info('Caching response', response.url);

        CacheHelper.PUT(request, response).in(cacheName);

        return response;
    };
}

function requestFromNetwork(request) {
    if (!navigator.onLine) {
        console.warn('You are offline');
        return Promise.resolve(undefined);
    }

    console.info('You are online');

    return NetworkHelper.GET(request);
}

function fallbackToCache(request, cacheName) {
    return function (response) {
        if (response) {
            return response;
        }

        console.warn('Problem retrieving online asset', response);

        return CacheHelper.GET(request).from(cacheName);
    }
}
