/**
 * A basic example of how to use event listeners to detect a change of online/offline status and
 * to give the user some sort of feedback, in this case by adding the `offline` class to the body
 * to allow styling.
 */
(function () {
    'use strict';

    var updateOnlineStatus = function () {
            var state = navigator.onLine ? 'online' : 'offline';

            document.body.className = state;
        };

    console.info('0. Offline detection example: running');

    window.addEventListener('load', () => {
        console.info('Adding listeners');

        window.addEventListener('online',  updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        updateOnlineStatus();
    });

    navigator.serviceWorker.register('service-worker.js', {scope: './'})
        .then((registation) => {
            console.log('boom');
        });
}());
