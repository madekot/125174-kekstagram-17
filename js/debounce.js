'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  window.debounce = function (cb, interval) {
    interval = interval || DEBOUNCE_INTERVAL;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, interval);
  };
})();
