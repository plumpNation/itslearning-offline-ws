(function () {
    'use strict';

    let init = function () {
            let newsHelper = new NewsHelper({
                'target': 'news-items',
                'service': 'news.json'
            });

            newsHelper.GET()
                .then((response) => newsHelper.populateDOM(response.news));

            new NetworkIndicator({'target': 'online-indicator'});
        };

    document.addEventListener('DOMContentLoaded', init);
}());
