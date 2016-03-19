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

    NewsHelper.prototype.toArticle = function (newsItem) {
        return `<article class="news-item anim-start">
            <header class="news-header">
                <img
                    class="news-avatar"
                    alt="${newsItem.author}'s avatar"
                    src="img/avatars/${newsItem.avatar}.png">
                <h1 class="news-item-headline">${newsItem.headline}</h1>
                <p class="news-meta">By ${newsItem.author}</p>
            </header>

            <div class="news-description">
                <p class="news-item-body">${newsItem.body}</p>
            </div>
        </article>`;
    };

    NewsHelper.prototype.populateDOM = function (newsItems) {
        let newsElements = newsItems.map(this.toArticle),
            target       = document.getElementById(this.options.target);

        target.insertAdjacentHTML('afterend', newsElements.join(''));
    };

    NewsHelper.prototype.prepend = function (newsItem) {
        let newsElement = this.toArticle(newsItem),
            target      = document.getElementById(this.options.target);

        target.insertAdjacentHTML('afterbegin', newsElement);
    };

    NewsHelper.prototype.GET = function () {
        if (!this.options.service) {
            return new Error('Service URI missing from constuctor options');
        }

        return fetch(this.options.service).then((news) => news.json());
    };

    NewsHelper.prototype.POST = function (data) {
        let options = {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        };

        return fetch('news.json', options);
    };

    window.NewsHelper = NewsHelper;

}(window));
