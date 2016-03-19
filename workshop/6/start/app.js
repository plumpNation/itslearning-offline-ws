(function () {
    'use strict';

    let newsHelper,

        loadAndShowNews = function (event) {
            newsHelper = new NewsHelper({
                'target' : 'news-items',
                'service': 'news.json'
            });

            newsHelper.GET()
                .then((response) => newsHelper.populateDOM(response.news));

            window.addEventListener('news-submitted', (event) => {
                newsHelper.POST(event.detail.data)
                    .then((response) => newsHelper.prepend(event.detail.data));
            });
        },

        setupAddNews = function () {
            let addButton = document.getElementById('add-news')

            addButton.addEventListener('click', (event) => {
                let newsForm = document.getElementById('add-news-form');

                if (!newsForm) {
                    new NewsForm();
                }
            });
        },

        init = function () {
            loadAndShowNews();

            new NetworkIndicator({'target': 'network-indicator'});
            // new ServiceWorkerHelper('service-worker.js', {'scope': './'});

            setupAddNews();
        };

    document.addEventListener('DOMContentLoaded', init);
}());
