(function () {
    'use strict';

    console.info('4. Simple offline fallback example: running');

    navigator.serviceWorker.register('service-worker.js', {scope: './'});
}());
