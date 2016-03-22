/**
 * A basic example of how to use event listeners to detect a change of online/offline status and
 * to give the user some sort of feedback, in this case by adding the `offline` class to the body
 * to allow styling.
 */
(function () {
    'use strict';

    let updateOnlineStatus = function () {
            let state = navigator.onLine ? 'online' : 'offline';

            document.body.className = state;
        };

    console.info('2. Offline detection running');

    window.addEventListener('load', () => {
        window.addEventListener('online',  updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        updateOnlineStatus();
    });
}());
