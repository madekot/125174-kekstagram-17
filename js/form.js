'use strict';
(function () {

  var submitBatton = document.querySelector('.img-upload__submit');

  var checkOnFocus = function (evt, element) {
    return evt.target !== element;
  };

  submitBatton.addEventListener('click', function () {
    window.validation.check();
  });

  window.form = {
    checkOnFocus: checkOnFocus,
  };
})();
