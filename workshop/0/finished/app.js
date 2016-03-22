(function () {
    'use strict';

    let changeState = function () {
            let element = document.getElementById('network-indicator'),
                state   = navigator.onLine ? 'online' : 'offline';

            element.className = state;
        },

        setupNetworkIndication = function (targetId) {
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

            setupNetworkIndication('network-indicator');
        };

    document.addEventListener('DOMContentLoaded', init);
}());
