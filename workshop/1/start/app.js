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

            // The network indicator code and html has been moved to a component
            // to make sure this file remains legible.
            new NetworkIndicator({'target': 'network-indicator'});
        };

    document.addEventListener('DOMContentLoaded', init);
}());
