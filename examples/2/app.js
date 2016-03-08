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
        .then(function (reg) {
            // registration worked
            console.log('Registration succeeded. Scope is ' + reg.scope);
        })
        .catch(function (error) {
            // registration failed
            console.error('Registration failed with ' + error);
        });
}());
