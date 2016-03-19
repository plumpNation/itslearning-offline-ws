/**
 * Simple component to create a news form and POST it.
 */
(function (window) {
    'use strict';

    function NewsForm(options) {
        if (!(this instanceof NewsForm)) {
            return new NewsForm();
        }

        this.renderTo(document.body, (form) => {
            form.getElementsByTagName('input')[0].focus();

            form.addEventListener('submit', this.onSubmit);
            form.addEventListener('click', (event) => event.stopPropagation());

            setTimeout(function () {
                let formContainer = document.getElementById('news-form-container');

                formContainer.addEventListener('click', teardown);
            }, 100);
        });
    }

    function teardown() {
        let formContainer = document.getElementById('news-form-container');

        formContainer.removeEventListener('click', teardown);
        document.body.removeChild(formContainer);
    }

    NewsForm.prototype.onSubmit = function (event) {
        let form = event.target,

            data = {
                'headline': form.headline.value,
                'body'    : form.body.value,
                'author'  : form.author.value,
                'avatar'  : form.avatar.value
            };

        event.preventDefault();

        window.dispatchEvent(new CustomEvent('news-submitted', {
            'detail': {
                'data': data,
                'form': form
            }
        }));

        teardown();
    };

    NewsForm.prototype.getTemplate = function () {
        return `
        <section id="news-form-container">
            <form
                id="news-form"
                method="post"
                action="./news.json"
                class="pure-form pure-form-aligned anim-start">

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
            </form>
        </section>`;
    };

    NewsForm.prototype.renderTo = function (element, callback) {
        let template = this.getTemplate();

        element.insertAdjacentHTML('beforeend', template);

        return callback(document.getElementById('news-form'));
    }

    window.NewsForm = NewsForm;
}(window));
