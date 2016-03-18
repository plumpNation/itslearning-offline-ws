/**
 * Simple component to create a news form and POST it.
 */
(function (window) {
    'use strict';

    function NewsForm() {
        if (!(this instanceof NewsForm)) {
            return new NewsForm();
        }

        renderTo();
    }

    function renderTo() {
        let template =
            `<form id="add-news-form" class="pure-form pure-form-aligned">
                <fieldset class="pure-group">
                    <input
                        id="add-news-headline"
                        type="text"
                        class="pure-input-1-2"
                        placeholder="Headline">

                    <textarea
                        id="add-news-body"
                        class="pure-input-1-2"
                        placeholder="Body">
                    </textarea>
                </fieldset>

                <fieldset class="pure-group">
                    <select id="avatar">
                        <option>ericf</option>
                        <option>andrew</option>
                        <option>reid</option>
                        <option>tilo</option>
                        <option>gavin</option>
                    </select>
                </fieldset>
            </form>`;

        document.body.insertAdjacentHTML('beforeend', template);
    }

    window.NewsForm = NewsForm;
}(window));
