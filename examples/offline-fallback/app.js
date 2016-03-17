(function () {
    'use strict';

    console.info('Simple offline fallback example: running');

    navigator.serviceWorker.register('service-worker.js', {scope: './'});
}());
