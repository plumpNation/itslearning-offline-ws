(function () {
    'use strict';

    let newsHelper,

        init = function () {
            newsHelper = new NewsHelper({
                'target': 'news-items',
                'service': './news.json'
            });

            newsHelper.GET()
                .then((response) => newsHelper.populateDOM(response.news));
        };

    document.addEventListener('DOMContentLoaded', init);
}());
