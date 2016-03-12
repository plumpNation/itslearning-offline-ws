(function () {
    'use strict';

    var scope     = './',
        worker    = 'service-worker.js',
        options   = {
            'scope': scope
        };

    console.info('Kitchen sink: running');

    navigator.serviceWorker
        .register(worker, options)
        .then(function (registration) {
            console.info('Kitchen sink registration succeeded. Scope is ' + registration.scope);
        })
        .catch(function (error) {
            console.warn('Kitchen sink registration failed with ' + error);
        });
}());
