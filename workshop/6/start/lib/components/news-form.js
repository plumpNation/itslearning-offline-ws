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
                            id="headline"
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

        document.getElementById('headline').focus();

        document.getElementById('news-form').addEventListener('submit', (event) => {
            let form = document.getElementById('news-form'),

                options = {
                    method: 'POST',
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        'headline': form.headline.value,
                        'body'    : form.body.value,
                        'author'  : form.body.value,
                        'avatar'  : form.avatar.value
                    })
                };

            event.preventDefault();

            fetch('news.json', options)
                .then(() => document.body.removeChild(form));
        });
    }

    window.NewsForm = NewsForm;
}(window));
