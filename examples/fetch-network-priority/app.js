(function () {
    'use strict';

    let scope     = './',
        worker    = 'service-worker.js',
        options   = {
            'scope': scope
        };

    console.info('Kitchen sink: running');

    navigator.serviceWorker
        .register(worker, options)
        .then((registration) => {
            console.info('Kitchen sink registration succeeded. Scope:', registration.scope);
        })
        .catch((error) => {
            console.warn('Kitchen sink registration failed', error);
        });
}());
