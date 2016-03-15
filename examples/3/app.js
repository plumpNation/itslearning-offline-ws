// This is to be filled out during segment 1 of the workshop
(function () {
    'use strict';

    let cacheName = 'v1-cache-api-example';

    console.info('3. Cache API example: running');

    cachePriorityFetch('./data.json').then(useTheResponse);

    function cachePriorityFetch(uri) {
        let request = new Request(uri),
            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. We are consuming this
            // once by cache and once by the browser for fetch.
            clonedRequest = request.clone();

        return caches
            .match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    debugger;
                    return cachedResponse;
                }

                return fetch(clonedRequest)
                    .then((response) => cacheNetworkResponse(cacheName, request, response));
            });
    };

    function cacheNetworkResponse(cacheName, request, response) {
        return caches.open(cacheName)
            .then((cache) => {
                cache.put(request, response.clone());

                // We don't need to wait for the asset to finish caching, so we
                // can just return the response immediately.
                return response;
            });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////  HELPERS  /////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////

    function useTheResponse(response) {
        response.json()
            .then((json) => {
                document
                    .getElementById('output')
                    .insertAdjacentHTML('beforeEnd', json.body);
            });
    }
}());
