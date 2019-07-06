'use strict';
(function () {

  var imageEditingFormElement = document.querySelector('.img-upload');
  var submitBatton = document.querySelector('.img-upload__submit');

  var checkOnFocus = function (evt, element) {
    return evt.target !== element;
  };


  imageEditingFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });

  submitBatton.addEventListener('click', function () {
    window.validation.checks();
  });

  window.form = {
    checkOnFocus: checkOnFocus,
  };
})();
