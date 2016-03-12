// This is to be filled out during segment 1 of the workshop
(function () {
    'use strict';

    var scope     = './',
        workerUrl = 'service-worker.js',
        options   = {
            'scope': scope
        },

        runApplication = function (registration) {
            console.info('2 registration succeeded. Scope is ' + registration.scope);

            fetch('./snippet.html')
                .then(function (response) {
                    return response.text();
                })
                .then(function (html) {
                    document.getElementById('output')
                        .insertAdjacentHTML('beforeEnd', html);
                });
        };

    console.info('2. ServiceWorker intercept request example: running');

    navigator.serviceWorker
        .register(workerUrl, options)
        .then(runApplication)
        .catch((error) => {
            console.warn('2. registration failed with', error);
        });
}());
