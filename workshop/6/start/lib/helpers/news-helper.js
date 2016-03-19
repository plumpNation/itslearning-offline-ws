(function (window) {
    'use strict';

    let NewsHelper = {};

    NewsHelper.toArticle = function (newsItem) {
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

    NewsHelper.populateDOM = function (elementId, newsItems) {
        let newsElements = newsItems.map(this.toArticle),
            target       = document.getElementById(elementId);

        target.insertAdjacentHTML('afterend', newsElements.join(''));
    };

    NewsHelper.prepend = function (elementId, newsItem) {
        let newsElement = this.toArticle(newsItem),
            target      = document.getElementById(elementId);

        target.insertAdjacentHTML('afterbegin', newsElement);
    };

    NewsHelper.GET = function (url) {
        return fetch(url).then((news) => news.json());
    };

    NewsHelper.POST = function (url, data) {
        let options = {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        };

        return fetch(url, options);
    };

    window.NewsHelper = NewsHelper;

}(window));
