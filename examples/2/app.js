(function () {
    'use strict';

    var scope   = 'http://localhost:8000/examples/',
        worker  = 'example2-sw.js',
        options = {
            'scope': scope
        };

    console.info('Example 2 script is running');

    navigator.serviceWorker
        .register(scope + worker, options)
        .then(function (registration) {
            console.info('Example 2 registration succeeded. Scope is ' + registration.scope);
        })
        .catch(function (error) {
            console.warn('Example 2 registration failed with ' + error);
        });
}());