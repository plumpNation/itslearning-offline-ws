// This is to be filled out during segment 1 of the workshop
(function () {
    'use strict';

    var scope     = './',
        workerUrl = 'service-worker.js',
        options   = {
            'scope': scope
        };

    console.info('1. ServiceWorker Lifecycle example: running');

    navigator.serviceWorker
        .register(workerUrl, options)
        .then((registration) => {
            console.info('1. registration succeeded. Scope is', registration.scope);
        })
        .catch((error) => {
            console.warn('1. registration failed with', error);
        });
}());
