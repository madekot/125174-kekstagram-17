'use strict';
(function () {

  var submitBatton = document.querySelector('.img-upload__submit');

  var checkOnFocus = function (evt, element) {
    return evt.target !== element;
  };

  var formElement = document.querySelector('#upload-select-image');
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.validation.clearFieldHashtag();
  });

  var clearDescription = function () {
    var descriptionElement = document.querySelector('.text__description');
    descriptionElement.value = '';
  };

  submitBatton.addEventListener('click', function () {
    window.validation.check();
  });

  window.form = {
    checkOnFocus: checkOnFocus,
    clearDescription: clearDescription,
  };
})();
