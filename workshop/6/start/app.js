/**
 * The controller for the 'news app' example
 */
(function (window) {
    'use strict';

    let setupAddNews = function () {
            let addNewsButton = document.getElementById('add-news');

            window.addEventListener('news-submitted', (event) => {
                NewsHelper.POST('news.json', event.detail)
                    .then((response) => NewsHelper.prepend('news-items', event.detail));
            });

            addNewsButton.addEventListener('click', (event) => {
                let newsForm = document.getElementById('add-news-form');

                if (!newsForm) {
                    // a NewsForm instance will fire the 'news-submitted' event
                    new NewsForm();
                }
            });
        },

        loadAndShowNews = function (event) {
            NewsHelper.GET('news.json')
                .then((response) => NewsHelper.populateDOM('news-items', response.news));

            setupAddNews();
        },

        init = function () {
            new NetworkIndicator({'target': 'network-indicator'});

            navigator.serviceWorker.register('service-worker.js');

            loadAndShowNews();
        };

    document.addEventListener('DOMContentLoaded', init);
}(window));
