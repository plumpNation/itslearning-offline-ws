(function () {
    'use strict';

    let setupServiceWorker = function () {
            let options = {'scope': './'},
                serviceWorkerHelper = new ServiceWorkerHelper('service-worker.js', options);
        },

        init = function () {
            let newsHelper = new NewsHelper({
                    'target': 'news-items',
                    'service': 'news.json'
                });

            newsHelper.GET()
                .then((response) => newsHelper.populateDOM(response.news));

            new NetworkIndicator({'target': 'network-indicator'});

            setupServiceWorker();
        };

    document.addEventListener('DOMContentLoaded', init);
}());
