'use strict';
(function () {

  var DEFAULT_SLAYDER_POSITION = 100;
  var FILTER_CLASSES = [FILTER_DEFAULT_CLASS, 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
  var FILTER_DEFAULT_CLASS = 'effects__preview--original';
  var FILTER_MAX_VALUE = [1, 1, 100, 3, 3];
  var FILTER_NAMES = ['grayscale', 'sepia', 'invert', 'blur', 'brightness'];

  var imageEditingFormElement = document.querySelector('.img-upload'); // форма редактирования фото

  var resetClassListFilter = function (element, filterClasses) {
    filterClasses.forEach(function (nameClass) {
      element.classList.remove(nameClass);
    });
  };

  var effectDepthSliderElement = imageEditingFormElement.querySelector('.img-upload__effect-level');
  var hideOrShowSlider = function (filterClass, filterDefaultClass) {
    return filterClass !== filterDefaultClass
      ? effectDepthSliderElement.classList.remove('hidden')
      : effectDepthSliderElement.classList.add('hidden');
  };

  var progressBarSliderElement = effectDepthSliderElement.querySelector('.effect-level__depth');
  var resetPosition = function (position) {
    position = position || DEFAULT_SLAYDER_POSITION;
    pinSliderElement.style.left = position + '%';
    progressBarSliderElement.style.width = position + '%';
  };

  var convertPercentToFilterValue = function (unit, filsterMaxValue) {
    return filsterMaxValue / 100 * unit;
  };

  var convertClassToFilterStyle = function (effectValue) {
    var result = '';
    switch (imagePreviewElement.className) {
      case FILTER_CLASSES[1]: result = FILTER_NAMES[0] + '(' + convertPercentToFilterValue(effectValue, FILTER_MAX_VALUE[0]) + ')';
        break;
      case FILTER_CLASSES[2]: result = FILTER_NAMES[1] + '(' + convertPercentToFilterValue(effectValue, FILTER_MAX_VALUE[1]) + ')';
        break;
      case FILTER_CLASSES[3]: result = FILTER_NAMES[2] + '(' + convertPercentToFilterValue(effectValue, FILTER_MAX_VALUE[2]) + '%' + ')';
        break;
      case FILTER_CLASSES[4]: result = FILTER_NAMES[3] + '(' + convertPercentToFilterValue(effectValue, FILTER_MAX_VALUE[3]) + 'px' + ')';
        break;
      case FILTER_CLASSES[5]: result = FILTER_NAMES[4] + '(' + convertPercentToFilterValue(effectValue, FILTER_MAX_VALUE[4]) + ')';
        break;
    }
    return result;
  };

  var getPositionPinSliderPercent = function () {
    var positionLeftWidthPin = pinSliderElement.offsetLeft;
    var parentWidth = pinSliderElement.offsetParent.offsetWidth;

    var onePercent = parentWidth / 100;
    var percentPinWidth = positionLeftWidthPin / onePercent;
    return Math.round(percentPinWidth);
  };

  var pinSliderElement = effectDepthSliderElement.querySelector('.effect-level__pin');
  var effectLevelValueElement = effectDepthSliderElement.querySelector('.effect-level__value'); // поле значения эфекта слайдера
  var imagePreviewElement = imageEditingFormElement.querySelector('.img-upload__preview img'); // Изображение на котором применяются фильтры
  pinSliderElement.addEventListener('mouseup', function () {
    var effectValue = effectLevelValueElement.value;
    effectValue = getPositionPinSliderPercent();
    imagePreviewElement.style.filter = convertClassToFilterStyle(effectValue);// накладываает фильтр
  });

  pinSliderElement.addEventListener('mousedown', function (mouseDownEvt) {
    mouseDownEvt.preventDefault();
    var startingCoordinatesMouseX = mouseDownEvt.clientX;

    var onPinMouseMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();
      var shiftCoordinatesMouse = startingCoordinatesMouseX - mouseMoveEvt.clientX;
      startingCoordinatesMouseX = mouseMoveEvt.clientX;
      var offsetParentWidth = pinSliderElement.offsetParent.clientWidth;
      var pinPositionNumber = parseInt(pinSliderElement.style.left, 10);

      var effectValue = effectLevelValueElement.value;
      effectValue = getPositionPinSliderPercent();
      imagePreviewElement.style.filter = convertClassToFilterStyle(effectValue);// накладываает фильтр

      var centerPinPercent = (pinSliderElement.clientWidth / 2) / 100;
      pinSliderElement.style.left = ((pinSliderElement.offsetLeft - shiftCoordinatesMouse) - centerPinPercent) + 'px';
      if (pinPositionNumber < 0) {
        pinSliderElement.style.left = 0;
      }
      if (pinPositionNumber > offsetParentWidth) {
        pinSliderElement.style.left = offsetParentWidth + 'px';
      }
    };
    document.addEventListener('mousemove', onPinMouseMove);

    var onSetupElementMouseUp = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onSetupElementMouseUp);
    };

    document.addEventListener('mouseup', onSetupElementMouseUp);

  });

  var addClassAddChangeEvent = function (imageFilterPreviewElement, filterClass) {
    imageFilterPreviewElement.addEventListener('click', function () {
      resetClassListFilter(imagePreviewElement, FILTER_CLASSES); // Удаляет старые классы фильтров с превью картинки;
      imagePreviewElement.classList.add(filterClass); // Добавляет класс фильтра на превью картинку;
      resetPosition(DEFAULT_SLAYDER_POSITION); // Сбрасывает прогресс бар и ручку глубины эфекта, в положение дефолта;
      hideOrShowSlider(filterClass, FILTER_DEFAULT_CLASS); // Cкрывает или показывает слайдер изменения эффекта;
      imagePreviewElement.style.filter = ''; // сбрасываю инлайновые стили фильтров у главной картинки превью;
    });
  };

  var imagesFilterPreviewElements = imageEditingFormElement.querySelectorAll('.effects__item');
  var addClassAddChangeEvents = function (imagesPreviewFilters, filterClasses) {
    imagesFilterPreviewElements.forEach(function (imagePreviewfilter, i) {
      var filterClass = filterClasses[i];
      addClassAddChangeEvent(imagePreviewfilter, filterClass);
    });
  };

  addClassAddChangeEvents(imagesFilterPreviewElements, FILTER_CLASSES);

  window.slider = {
    resetPosition: resetPosition,
  };

})();
