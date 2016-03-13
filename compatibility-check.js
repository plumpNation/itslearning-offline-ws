(function () {
    'use strict';

    let message = 'Your browser supports service workers!';

    if ('serviceWorker' in navigator) {
        console.info(message);
        return;
    }

    message = 'Sorry bud, your browser does not support service workers. Try Chrome?';

    alert(message);

    console.warn(message);
}());
