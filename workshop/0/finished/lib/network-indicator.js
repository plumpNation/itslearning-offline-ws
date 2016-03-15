/**
 * A small component to add offline and online classes to a DOM element.
 */
(function (window) {
    'use strict';

    let changeState = function (targetId) {
            let onlineIndicator = document.getElementById(targetId),
                onlineState     = navigator.onLine ? 'online' : 'offline';

            onlineIndicator.className = onlineState;
        },

        setupNetworkIndicator = function (targetId) {
            window.addEventListener('offline', () => changeState(targetId));
            window.addEventListener('online',  () => changeState(targetId));

            changeState(targetId);
        };

    /**
     * @param {Object} options
     * @param {string} options.target The id of the DOM element to apply the classes to.
     */
    var NetworkIndicator = function (options) {
        if (!(this instanceof NetworkIndicator)) {
            return new NetworkIndicator(options);
        }

        if (!options || !options.target) {
            throw new Error('options.target must be supplied');
        }

        setupNetworkIndicator(options.target);
    };

    window.NetworkIndicator = NetworkIndicator;

}(window));
