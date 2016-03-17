// This is to be filled out during segment 1 of the workshop
(function () {
    'use strict';

    let scope     = './',
        workerUrl = 'service-worker.js',
        options   = {
            'scope': scope
        },

        runApplication = function (registration) {
            console.info('Registration succeeded. Scope is ' + registration.scope);

            // This is the request that is intercepted in the service worker.
            fetch('./snippet.html')
                .then(function (response) {
                    return response.text();
                })
                .then(function (html) {
                    document.getElementById('output')
                        .insertAdjacentHTML('beforeEnd', html);
                });
        };

    console.info('ServiceWorker intercept request example: running');

    navigator.serviceWorker
        .register(workerUrl, options)
        .then(runApplication)
        .catch((error) => {
            console.warn('Registration failed with', error);
        });
}());
