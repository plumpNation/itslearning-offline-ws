(function () {
    'use strict';

    var scope     = './',
        worker    = 'service-worker.js',
        options   = {
            'scope': scope
        };

    console.info('2. Cache API: running');

    navigator.serviceWorker
        .register(worker, options)
        .then(function (registration) {
            console.info('2. registration succeeded. Scope is ' + registration.scope);
        })
        .catch(function (error) {
            console.warn('2. registration failed with ' + error);
        });
}());
