'use strict';
(function () {

  var submitButton = document.querySelector('.img-upload__submit');

  var checkOnFocus = function (evt, element) {
    return evt.target !== element;
  };

  var formElement = document.querySelector('#upload-select-image');
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });

  var clearDescription = function () {
    var descriptionElement = document.querySelector('.text__description');
    descriptionElement.value = '';
  };

  submitButton.addEventListener('click', function () {
    window.validation.check();
  });

  window.form = {
    checkOnFocus: checkOnFocus,
    clearDescription: clearDescription,
  };
})();
