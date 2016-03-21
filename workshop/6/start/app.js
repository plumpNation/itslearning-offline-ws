/**
 * The controller for the 'news app' example
 */
(function (window) {
    'use strict';

    let setupNewsForm = function () {
            let addNewsButton = document.getElementById('add-news');

            addNewsButton.addEventListener('click', (event) => {
                let newsForm = document.getElementById('add-news-form');

                if (!newsForm) {
                    // a NewsForm instance will fire the 'news-submitted' event
                    new NewsForm();
                }
            });
        },

        setupAddNews = function () {
            window.addEventListener('news-submitted', (event) => {
                NewsHelper.POST('news.json', event.detail)
                    .then((response) => NewsHelper.prepend('news-items', event.detail));
            });
        },

        loadAndShowNews = function (event) {
            setupAddNews();
        },

        init = function () {
            new NetworkIndicator({'target': 'network-indicator'});

            navigator.serviceWorker.register('service-worker.js');

            loadAndShowNews();
            setupNewsForm();
        };

    document.addEventListener('DOMContentLoaded', init);
}(window));
