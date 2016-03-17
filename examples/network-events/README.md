0. Offline detection
===============================

## What is in the page?
1. A CSS file.
3. A javascript file.
4. Some arbitrary HTML.

## What to do

1. Open a browser tab.
2. Open the web developer tools on the console tab.
3. Experiment with the `navigator.onLine` property.

```javascript
// If you just want to know if you are online right now
let state = navigator.onLine ? 'online' : 'offline';

alert('you are currently ' + state);

// Using listeners is really useful, since you can inform a user immediately
window.addEventListener('offline', function (e) {
    alert('offline');
}, false);

window.addEventListener('online', function (e) {
    alert('online');
}, false);
```
