'use strict';
(function () {
  var DEFAULT_VALUE_SIZE_FIELD = 100;
  var DEFAULT_VALUE_SIZE_FIELD_TRANSFORM = 1;
  var MAX_SIZE = 100;
  var MIN_SIZE = 25;
  var NUMBER_SYSTEM = 10;
  var RESIZING_STEP = 25;

  var imageEditingFormElement = document.querySelector('.img-upload'); // форма редактирования фото
  var sizeFieldElement = imageEditingFormElement.querySelector('.scale__control--value'); // поле размера фото;
  var imagePreviewElement = imageEditingFormElement.querySelector('.img-upload__preview img'); // Изображение превью

  var resizePhotoPreview = function (value) {
    value = value / 100;
    imagePreviewElement.style.transform = 'scale(' + value + ')';
  };

  var increaseFieldValue = function () { // Увеличивает значения поля размера фото
    var sizeFieldElementvalue = parseInt(sizeFieldElement.value, NUMBER_SYSTEM); // вытаскивает число из строки значения поля;
    if (sizeFieldElementvalue < MAX_SIZE) {
      sizeFieldElementvalue += RESIZING_STEP;
      sizeFieldElement.value = sizeFieldElementvalue + '%';
    }
    return sizeFieldElementvalue;
  };

  var decreaseFieldValue = function () { // Уменьшает значения поля размера фото
    var sizeFieldElementvalue = parseInt(sizeFieldElement.value, NUMBER_SYSTEM); // вытаскивает число из строки значения поля;
    if (sizeFieldElementvalue > MIN_SIZE) {
      sizeFieldElementvalue -= RESIZING_STEP;
      sizeFieldElement.value = sizeFieldElementvalue + '%';
    }
    return sizeFieldElementvalue;
  };

  var onImageIncreaseButtonClick = function () { // увеличивает значения поля размера;
    resizePhotoPreview(increaseFieldValue());
  };

  var onImageDecreaseButtonClick = function () { // уменьшает значения поля размера;
    resizePhotoPreview(decreaseFieldValue());
  };

  var increaseButtonElement = imageEditingFormElement.querySelector('.scale__control--bigger');
  var decreaseButtonElement = imageEditingFormElement.querySelector('.scale__control--smaller');

  var addHandlersResizeButton = function () {
    increaseButtonElement.addEventListener('click', onImageIncreaseButtonClick);
    decreaseButtonElement.addEventListener('click', onImageDecreaseButtonClick);
  };

  var removeHandlersResizeButton = function () {
    increaseButtonElement.removeEventListener('click', onImageIncreaseButtonClick);
    decreaseButtonElement.removeEventListener('click', onImageDecreaseButtonClick);
  };

  var reset = function () {
    sizeFieldElement.value = DEFAULT_VALUE_SIZE_FIELD + '%';
    imagePreviewElement.style.transform = 'scale(' + DEFAULT_VALUE_SIZE_FIELD_TRANSFORM + ')'; // Сбрасывает размер изображения формы редактирования к дефолтному значению;
  };

  window.resizePhotoPreview = {
    reset: reset,
    addHandlersResizeButton: addHandlersResizeButton,
    removeHandlersResizeButton: removeHandlersResizeButton,
  };
})();
