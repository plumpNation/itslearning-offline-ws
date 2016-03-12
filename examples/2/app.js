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

            fetch('./data.json')
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json);
                });
        };

    console.info('2. ServiceWorker intercept request example: running');

    navigator.serviceWorker
        .register(workerUrl, options)
        .then(runApplication)
        .catch(function (error) {
            console.warn('2 registration failed with ' + error);
        });
}());
