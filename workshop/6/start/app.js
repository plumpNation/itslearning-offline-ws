(function () {
    'use strict';

    let newsHelper,

        loadAndShowNews = function (event) {


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
            newsHelper = new NewsHelper({
                'target' : 'news-items',
                'service': 'news.json'
            });

            loadAndShowNews();

            window.addEventListener('updated', (event) => {
                newsHelper.prepend(event.detail);
            });

            new NetworkIndicator({'target': 'network-indicator'});
            // new ServiceWorkerHelper('service-worker.js', {'scope': './'});

            setupAddNews();
        };

    document.addEventListener('DOMContentLoaded', init);
}());
