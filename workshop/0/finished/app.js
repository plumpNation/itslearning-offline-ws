(function () {
    'use strict';

    let changeState = function (targetId) {
            let onlineIndicator = document.getElementById(targetId),
                onlineState     = navigator.onLine ? 'online' : 'offline';

            onlineIndicator.className = onlineState;
        },

        setupNetworkIndication = function (targetId) {
            window.addEventListener('offline', () => changeState(targetId));
            window.addEventListener('online',  () => changeState(targetId));

            changeState(targetId);
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
