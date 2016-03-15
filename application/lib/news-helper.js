(function (window) {
    'use strict';

    /**
     * A small module to help loading and populating the page with news items loaded
     * from the news.json.
     *
     * @param {Object} options
     * @param {string} options.target The id of the container to put the news items in.
     * @return void
     */
    let NewsHelper = function (options) {
            if (!(this instanceof NewsHelper)) {
                return new NewsHelper(options);
            }

            if (!options || !options.target) {
                throw new Error('You must provide a target');
            }

            this.options = options;
        };

    NewsHelper.prototype.toArticles = function (newsItem) {
        let avatarSrc = `img/avatars/${newsItem.avatar}.png`;

        return `<article class="news-item">
            <header class="news-header">
                <img class="news-avatar" alt="${newsItem.author}'s avatar" src="${avatarSrc}">
                <h1 class="news-item-headline">${newsItem.headline}</h1>
                <p class="news-meta">By ${newsItem.author}</p>
            </header>

            <div class="news-description">
                <p class="news-item-body">${newsItem.body}</p>
            </div>
        </article>`;
    };

    NewsHelper.prototype.populateDOM = function (newsItems) {
        let newsElements = newsItems.map(this.toArticles),
            target       = document.getElementById(this.options.target);

        target.insertAdjacentHTML('afterend', newsElements);
    };

    NewsHelper.prototype.GET = function (uri) {
        return fetch(uri).then((news) => news.json());
    };

    window.NewsHelper = NewsHelper;

}(window));
