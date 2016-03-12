// This is to be filled out during segment 1 of the workshop
(function () {
    'use strict';

    var cacheName = 'v1-cache-api-example',

        useTheResponse = function (response) {
            response.json()
                .then(function (json) {
                    document
                        .getElementById('output')
                        .insertAdjacentHTML('beforeEnd', json.body);
                });
        },

        cacheThis = function (cacheName, request, response) {
            return caches.open(cacheName)
                .then(function (cache) {
                    return cache.put(request.clone(), response.clone());
                });
        },

        fetchCacheFirst = function (uri) {
            var networkResponse,
                networkRequest = new Request(uri);

            return caches
                .match(networkRequest)
                .then(function (cachedResponse) {
                    if (cachedResponse) {
                        return cachedResponse;

                    } else {
                        return fetch(networkRequest)
                            .then(function (response) {
                                networkResponse = response;

                                return cacheThis(cacheName, networkRequest, networkResponse);

                            })
                            .then(function () {
                                return networkResponse;
                            });
                    }
                });
        };

    // check the caches for a match to the request
    fetchCacheFirst('./data.json').then(useTheResponse);

    console.info('3. Cache API example: running');
}());
