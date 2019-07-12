'use strict';
(function () {
  var KEY_CODE_ESC = 27;
  var getRandomNumber = function (min, max) {
    var result = min - 0.5 + Math.random() * (max - min + 1);
    result = Math.round(result);
    return result;
  };

  var getRandomBoolean = function () {
    return Boolean(getRandomNumber(0, 1));
  };

  var getRandomArrayElement = function (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  };

  var shuffleArray = function (arr) {
    return arr.sort(function () {
      return window.utility.random.boolean()
        ? -1
        : 1;
    });
  };

  window.utility = {
    random: {
      number: getRandomNumber,
      boolean: getRandomBoolean,
      arrayElement: getRandomArrayElement,
      shuffleArray: shuffleArray,
    },
    keyboard: {
      isEscPressed: function (evt) {
        return evt.keyCode === KEY_CODE_ESC;
      },
    },

  };
})();
