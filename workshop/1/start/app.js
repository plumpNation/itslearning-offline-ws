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

            new NetworkIndicator({'target': 'network-indicator'});
        };

    document.addEventListener('DOMContentLoaded', init);
}());
