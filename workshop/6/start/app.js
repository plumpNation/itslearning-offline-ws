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

        setupAddNews = function () {
            document.getElementById('add-news').addEventListener('click', (event) => {
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
