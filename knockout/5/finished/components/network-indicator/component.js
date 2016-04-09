/**
 * network-indicator
 * A small component to display network status
 */
(function (window) {
    'use strict';

    ko.components.register('network-indicator', {
        viewModel: function () {
            let setState = () => {
                    let stateName = navigator.onLine ? 'online' : 'offline';

                    this.state(stateName);
                };

            window.addEventListener('offline', setState);
            window.addEventListener('online',  setState);

            this.state = ko.observable();

            setState();
        },

        template:
            `<footer
                id="network-indicator"
                role="alert" aria-live="assertive"
                data-bind="css: state">
                <p class="network-state">
                    You are <span data-bind="text: state"></span>
                </p>
            </footer>`
    });

}(window));
