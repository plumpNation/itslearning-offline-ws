(function () {
    'use strict';

    let newsHelper,

        init = function () {
            debugger;

            new NetworkIndicator({'target': 'online-indicator'});

            newsHelper = new NewsHelper({'target': 'news-items'});

            newsHelper.GET('./news.json')
                .then((response) => newsHelper.populateDOM(response.news));
        };

    document.addEventListener('DOMContentLoaded', init);
}());
