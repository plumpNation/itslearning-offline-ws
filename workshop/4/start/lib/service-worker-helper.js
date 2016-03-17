(function (window) {
    'use strict';

    /**
     * A constructor that wraps the service worker registration.
     *
     * @param {string} workerUrl
     * @param {Object} options
     * @param {string} options.scope
     */
    let ServiceWorkerHelper = function (workerUrl, options) {
        return navigator.serviceWorker
            .register(workerUrl, options)
            .then((registration) => {
                console.info('Registered', workerUrl, 'on scope', registration.scope);
            });
    };

    window.ServiceWorkerHelper = ServiceWorkerHelper;
}(window));
