'use strict';
(function () {
  var THROTTLE_INTERVAL = 500; // ms

  var isTimeout = true;
  window.debounce = function (cb, interval) {
    interval = interval || THROTTLE_INTERVAL;
    if (isTimeout) {
      cb();
      isTimeout = false;
      window.setTimeout(function () {
        isTimeout = true;
      }, interval);
    }
  };
})();
