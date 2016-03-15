(function () {
    'use strict';

    let setupServiceWorker = function (workerUrl, options) {
            navigator.serviceWorker
                .register(workerUrl, options)
                .then((registration) => {
                    console.info('Registered', workerUrl, 'on scope', registration.scope);
                });
        },

        init = function () {
            let newsHelper = new NewsHelper({
                    'target': 'news-items',
                    'service': 'news.json'
                });

            newsHelper.GET()
                .then((response) => newsHelper.populateDOM(response.news));

            new NetworkIndicator({'target': 'network-indicator'});

            setupServiceWorker('service-worker.js', {'scope': './'});
        };

    document.addEventListener('DOMContentLoaded', init);
}());
