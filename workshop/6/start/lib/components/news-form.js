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

        let template =
            `<form id="news-form" class="pure-form pure-form-aligned">
                <fieldset class="pure-group">
                    <input
                        name="headline"
                        class="pure-input-1-2"
                        placeholder="Headline">

                    <textarea
                        name="body"
                        class="pure-input-1-2"
                        placeholder="Body">
                    </textarea>
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

        document.getElementById('news-form').addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('submitting');
        });
    }

    window.NewsForm = NewsForm;
}(window));
