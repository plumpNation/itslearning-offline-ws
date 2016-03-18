/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// The version should be unique, it's the name for the CacheStorage instance
let VERSION = 'v1-kitchen-sink-example',

    // The files we want to cache
    whitelist = [
        './',
        'index.html',
        'app.js',
        'offline-detection.js'
    ];

// Set the callback for the install step
self.addEventListener('install', (event) => {
    let urlsAreCached = cacheWhitelist(VERSION, whitelist);

    console.info(VERSION, 'installing');

    event.waitUntil(urlsAreCached);
});

self.addEventListener('activate', (event) => {
    let oldCachesRemoved = removeCaches(VERSION);

    console.info(VERSION, 'activating');

    event.waitUntil(oldCachesRemoved);
});

self.addEventListener('fetch', (event) => {
    let updatedResponse =
            requestFromNetwork(event.request, VERSION)
                .then(fallbackToCache(event.request, VERSION));

    event.respondWith(updatedResponse);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////  HELPERS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

let NetworkHelper = {
        GET: function (request) {
            let validateResponse = function (response) {
                if (NetworkHelper.isValid(response)) {
                    return response;
                }

                console.warn('Bad network response', request.url);
            };

            console.info('Requesting network', request.url);

            return fetch(request.clone())
                .catch((err) => {
                    console.warn(err.message);
                })
                .then(validateResponse);
        },

        /**
         * Validates an http response
         */
        isValid: function (response) {
            let failed =
                    !response ||
                    response.status !== 200 ||
                    response.type !== 'basic';

            return !failed;
        }
    },

    CacheHelper = {
        GET: function (request) {
            let log = function (response) {
                if (response === undefined) {
                    console.warn('Not found in cache', request.url);

                } else {
                    console.info('Found in cache', request.url);
                }

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
            let updateValue = function (cache) {
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
    let addWhitelistToCache = function (cache) {
            return cache.addAll(whitelist);
        };

    console.info(cacheName, 'Caching assets', whitelist);

    return caches.open(cacheName)
        .then(addWhitelistToCache);
}

/**
 * Removes all scope CacheStorage except cacheName provided as filter.
 *
 * @param string cacheName Cache with matching name will not be removed.
 */
function removeCaches(cacheName) {
    let outCurrentVersion = function (key) {
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

/**
 * Updates cached values for request, if request was previously cached.
 * Therefore it respects the whitelist created in the install.
 *
 * @param Object request
 * @param String cacheName The cache to update
 */
function cacheResponseFor(request, cacheName) {
    return function (response) {
        if (!NetworkHelper.isValid(response)) {
            console.warn('Not caching', response);
            return response;
        }

        return caches.match(request)
            .then((requestFoundInCache) => {
                console.log('Checking if should cache', request.url);

                if (requestFoundInCache) {
                    console.info('Caching response for', response.url);
                    CacheHelper.PUT(request, response).in(cacheName);

                } else {
                    console.warn('Not caching response for', response.url);
                }

                return response;
            })
    };
}

function requestFromNetwork(request, cacheName) {
    if (!navigator.onLine) {
        console.warn('You are offline');
        return Promise.resolve(undefined);
    }

    console.info('You are online');

    return NetworkHelper.GET(request)
        .then(cacheResponseFor(request, cacheName));
}

function fallbackToCache(request, cacheName) {
    return function (response) {
        if (response) {
            return response;
        }

        console.warn('Problem retrieving online asset', request.url);

        return CacheHelper.GET(request).from(cacheName);
    }
}
