(function () {
    'use strict';

    let setupNetworkIndicator = function () {
            let changeState = function () {
                    let element = document.getElementById('network-indicator'),
                        state   = navigator.onLine ? 'online' : 'offline';

                    element.className = state;
                };

            window.addEventListener('offline', changeState);
            window.addEventListener('online',  changeState);

            changeState();
        },

        loadAndShowNews = function () {
            let newsHelper = new NewsHelper({
                'target' : 'news-items',
                'service': 'news.json'
            });

            newsHelper.GET()
                .then((response) => newsHelper.populateDOM(response.news));
        },

        init = function () {
            loadAndShowNews();

            setupNetworkIndicator();
        };

    document.addEventListener('DOMContentLoaded', init);
}());
