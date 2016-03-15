(function () {
    'use strict';

    let newsHelper,

        onOnlineStateChange = function () {
            let onlineIndicator = document.getElementById('online-indicator'),
                onlineState     = navigator.onLine ? 'online' : 'offline';

            onlineIndicator.className = onlineState;
        },

        setupOfflineEvents = function () {
            window.addEventListener('offline', onOnlineStateChange);
            window.addEventListener('online',  onOnlineStateChange);

            onOnlineStateChange();
        },

        init = function () {
            setupOfflineEvents();

            newsHelper = new NewsHelper({
                'target': 'news-items'
            });

            newsHelper.GET('./news.json')
                .then((response) => newsHelper.populateDOM(response.news));
        };

    document.addEventListener('DOMContentLoaded', init);
}());
