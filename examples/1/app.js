// This is to be filled out during segment 1 of the workshop
(function () {
    'use strict';

    var scope   = 'http://localhost:8000/examples/',
        worker  = 'example1-sw.js',
        options = {
            'scope': scope
        };

    console.info('Example 1 script is running');

    navigator.serviceWorker
        .register(scope + worker, options)
        .then(function (registration) {
            console.info('Example 1 registration succeeded. Scope is ' + registration.scope);
        })
        .catch(function (error) {
            console.warn('Example 1 registration failed with ' + error);
        });
}());
