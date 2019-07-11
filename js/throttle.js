'use strict';
(function () {
  var THROTTLE_INTERVAL = 500;

  var isTimeout = true;
  window.throttle = function (cb, interval) {
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
