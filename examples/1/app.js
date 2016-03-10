// This is to be filled out during segment 1 of the workshop
(function () {
    'use strict';

    var scope     = 'http://localhost:8000/examples/1/',
        workerUrl = scope + 'service-worker.js',
        options   = {
            'scope': scope
        };

    console.info('1. ServiceWorker API example: running');

    navigator.serviceWorker
        .register(workerUrl, options)
        .then(function (registration) {
            console.info('1 registration succeeded. Scope is ' + registration.scope);
        })
        .catch(function (error) {
            console.warn('1 registration failed with ' + error);
        });
}());
