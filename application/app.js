(function () {
    'use strict';

    let newsHelper,

        init = function () {
            newsHelper = new NewsHelper({
                'target': 'news-items'
            });

            newsHelper.GET('./news.json')
                .then((response) => newsHelper.populateDOM(response.news));
        };

    document.addEventListener('DOMContentLoaded', init);
}());
