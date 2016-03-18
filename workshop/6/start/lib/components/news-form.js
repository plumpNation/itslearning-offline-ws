/**
 * Simple component to create a news form and POST it.
 */
(function (window) {
    'use strict';

    function NewsForm(options) {
        if (!(this instanceof NewsForm)) {
            return new NewsForm();
        }

        render();
    }

    function render() {

        let element,
            template =
                `<form
                    id="news-form"
                    method="post"
                    action="./news.json"
                    class="pure-form pure-form-aligned">

                    <fieldset class="pure-group">
                        <input
                            name="headline"
                            class="pure-input-1-2"
                            placeholder="Headline">

                        <textarea
                            name="body"
                            class="pure-input-1-2"
                            placeholder="Body"></textarea>
                    </fieldset>

                    <fieldset class="pure-group">
                        <input name="author" placeholder="Author">
                        <select name="avatar">
                            <option>ericf</option>
                            <option>andrew</option>
                            <option>reid</option>
                            <option>tilo</option>
                            <option>gavin</option>
                        </select>
                    </fieldset>

                    <button type="submit" class="pure-button pure-button-primary">Submit</button>
                </form>`;


        document.body.insertAdjacentHTML('beforeend', template);

        $('[name="headline"]').focus();

        element = $('form#news-form');

        element.on('submit', (event) => {
            event.preventDefault();

            $.post('./news.json', element.serialize(), (response) => {
                console.log(response);
            });

            element.remove();
        });
    }

    window.NewsForm = NewsForm;
}(window));
