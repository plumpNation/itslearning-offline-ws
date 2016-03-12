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

        cacheNetworkResponse = function (cacheName, request) {
            return function (response) {
                return caches.open(cacheName)
                    .then(function (cache) {
                        cache.put(request, response.clone());

                        // We don't need to wait for the asset to finish caching, so we
                        // can just return the response immediately.
                        return response;
                    });
            };
        },

        cachePriorityFetch = function (uri) {
            var request = new Request(uri),
                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. We are consuming this
                // once by cache and once by the browser for fetch.
                clonedRequest = request.clone();

            return caches
                .match(request)
                .then(function (cachedResponse) {
                    if (cachedResponse) {
                        return cachedResponse;

                    } else {
                        return fetch(clonedRequest)
                            .then(cacheNetworkResponse(cacheName, request));
                    }
                });
        };

    cachePriorityFetch('./data.json').then(useTheResponse);

    console.info('3. Cache API example: running');
}());
