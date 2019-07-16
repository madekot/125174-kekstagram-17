'use strict';
(function () {
  var DEFAULT_VALUE_SIZE_FIELD = 100;
  var DEFAULT_VALUE_SIZE_FIELD_TRANSFORM = 1;
  var MAX_SIZE = 100;
  var MIN_SIZE = 25;
  var NUMBER_SYSTEM = 10;
  var RESIZING_STEP = 25;

  var imageEditingFormElement = document.querySelector('.img-upload');
  var sizeFieldElement = imageEditingFormElement.querySelector('.scale__control--value');
  var imagePreviewElement = imageEditingFormElement.querySelector('.img-upload__preview img');

  var resizePhotoPreview = function (value) {
    value = value / 100;
    imagePreviewElement.style.transform = 'scale(' + value + ')';
  };

  var increaseFieldValue = function () {
    var sizeFieldElementValue = parseInt(sizeFieldElement.value, NUMBER_SYSTEM);
    if (sizeFieldElementValue < MAX_SIZE) {
      sizeFieldElementValue += RESIZING_STEP;
      sizeFieldElement.value = sizeFieldElementValue + '%';
    }
    return sizeFieldElementValue;
  };

  var decreaseFieldValue = function () {
    var sizeFieldElementValue = parseInt(sizeFieldElement.value, NUMBER_SYSTEM);
    if (sizeFieldElementValue > MIN_SIZE) {
      sizeFieldElementValue -= RESIZING_STEP;
      sizeFieldElement.value = sizeFieldElementValue + '%';
    }
    return sizeFieldElementValue;
  };

  var onImageIncreaseButtonClick = function () {
    resizePhotoPreview(increaseFieldValue());
  };

  var onImageDecreaseButtonClick = function () {
    resizePhotoPreview(decreaseFieldValue());
  };

  var increaseButtonElement = imageEditingFormElement.querySelector('.scale__control--bigger');
  var decreaseButtonElement = imageEditingFormElement.querySelector('.scale__control--smaller');

  var addHandlersButton = function () {
    increaseButtonElement.addEventListener('click', onImageIncreaseButtonClick);
    decreaseButtonElement.addEventListener('click', onImageDecreaseButtonClick);
  };

  var removeHandlersButton = function () {
    increaseButtonElement.removeEventListener('click', onImageIncreaseButtonClick);
    decreaseButtonElement.removeEventListener('click', onImageDecreaseButtonClick);
  };

  var reset = function () {
    sizeFieldElement.value = DEFAULT_VALUE_SIZE_FIELD + '%';
    imagePreviewElement.style.transform = 'scale(' + DEFAULT_VALUE_SIZE_FIELD_TRANSFORM + ')';
  };

  window.resizePhotoPreview = {
    reset: reset,
    addHandlersButton: addHandlersButton,
    removeHandlersButton: removeHandlersButton,
  };
})();
