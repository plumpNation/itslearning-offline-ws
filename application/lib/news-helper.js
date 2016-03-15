(function (window) {
    'use strict';

    let NewsHelper = function (options) {
            if (!(this instanceof NewsHelper)) {
                return new NewsHelper(options);
            }

            if (!options || !options.target) {
                throw new Error('You must provide a target');
            }

            this.options = options;
        },

        toArticles = function (newsItem) {
            return `<article class="post">
                <header class="news-header">
                    <img
                        class="news-avatar"
                        alt="${newsItem.author}'s avatar"
                        height="48"
                        width="48"
                        src="img/common/${newsItem.avatar}-avatar.png">

                    <h1 class="news-item-headline">${newsItem.headline}</h1>
                    <p class="news-meta">By ${newsItem.author}</p>
                </header>

                <div class="news-description">
                    <p class="news-item-body">${newsItem.body}</p>
                </div>
            </article>`;
        };

    NewsHelper.prototype.populateDOM = function (newsItems) {
        let newsElements = newsItems.map(toArticles),
            target       = document.getElementById(this.options.target);

        target.insertAdjacentHTML('afterend', newsElements);
    };

    NewsHelper.prototype.GET = function (uri) {
        return fetch(uri).then((news) => news.json());
    };

    window.NewsHelper = NewsHelper;

}(window));
