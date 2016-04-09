(function () {
    'use strict';

    let loadAndShowNews = function () {
            let newsHelper = new NewsHelper({
                'target' : 'news-items',
                'service': 'news.json'
            });

            newsHelper.GET()
                .then((response) => newsHelper.populateDOM(response.news));
        },

        init = function () {
            loadAndShowNews();
            // navigator.serviceWorker.register('service-worker.js');
            ko.applyBindings();
        };

    document.addEventListener('DOMContentLoaded', init);
}());
