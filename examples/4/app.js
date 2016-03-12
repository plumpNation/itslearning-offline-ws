/**
 * A basic example of how to use event listeners to detect a change of online/offline status and
 * to give the user some sort of feedback, in this case by adding the `offline` class to the body
 * to allow styling.
 */
(function () {
    'use strict';

    console.info('4. Simple offline fallback example: running');

    navigator.serviceWorker.register('service-worker.js', {scope: './'});
}());
