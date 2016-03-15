(function (window) {
    'use strict';

    /**
     * A small module to help loading and populating the page with news items loaded
     * from the news.json.
     *
     * @param {Object} options
     * @param {string} options.target The id of the container to put the news items in.
     * @param {string} options.service The uri to the json news service
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
        let avatarSrc = `img/avatars/${newsItem.avatar}.png`,
            avatarAlt = `${newsItem.author}'s avatar`;

        return `<article class="news-item">
            <header class="news-header">
                <img class="news-avatar" alt="${avatarAlt}" src="${avatarSrc}">
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

    NewsHelper.prototype.GET = function () {
        if (!this.options.service) {
            return new Error('Service URI missing from constuctor options');
        }

        return fetch(this.options.service).then((news) => news.json());
    };

    window.NewsHelper = NewsHelper;

}(window));
