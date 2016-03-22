(function () {
    'use strict';

    let scope     = './',
        worker    = 'service-worker.js',
        options   = {
            'scope': scope
        };

    console.info('Fetch network priority: running');

    navigator.serviceWorker
        .register(worker, options)
        .then((registration) => {
            console.info('Fetch network priority succeeded. Scope:', registration.scope);
        })
        .catch((error) => {
            console.warn('Fetch network priority failed', error);
        });
}());
