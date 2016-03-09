(function () {
    'use strict';

    var scope     = 'http://localhost:8000/examples/2/',
        workerUrl = scope + 'service-worker.js',
        options   = {
            'scope': scope
        };

    console.info('2. Cache API: running');

    navigator.serviceWorker
        .register(workerUrl, options)
        .then(function (registration) {
            console.info('2. registration succeeded. Scope is ' + registration.scope);
        })
        .catch(function (error) {
            console.warn('2. registration failed with ' + error);
        });
}());
