'use strict';
(function () {

  var DEFAULT_SLAYDER_POSITION = 100;
  var FILTER_DEFAULT_CLASS = 'effects__preview--original';
  var FILTER_CLASSES = [FILTER_DEFAULT_CLASS, 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
  var FILTER_MAX_VALUE = [1, 1, 100, 3, 3];
  var FILTER_HEAT_MIN_VALUE = 1;
  var FILTER_NAMES = ['grayscale', 'sepia', 'invert', 'blur', 'brightness'];
  var PIN_MOVE_STEP = 5;
  var KEYCODE_LEFT = 37;
  var KEYCODE_RIGHT = 39;

  var imageEditingFormElement = document.querySelector('.img-upload');

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

  var convertPercentToFilterValue = function (unit, filsterMaxValue, filterMinValue) {
    filterMinValue = filterMinValue || 0;
    return ((filsterMaxValue - filterMinValue) / 100 * unit) + filterMinValue;
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
      case FILTER_CLASSES[5]: result = FILTER_NAMES[4] + '(' + convertPercentToFilterValue(effectValue, FILTER_MAX_VALUE[4], FILTER_HEAT_MIN_VALUE) + ')';
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
  var effectLevelValueElement = effectDepthSliderElement.querySelector('.effect-level__value');

  var effectValue = DEFAULT_SLAYDER_POSITION;
  effectLevelValueElement.value = effectValue;

  var movePin = function () {
    effectValue = getPositionPinSliderPercent();
    effectLevelValueElement.value = effectValue;
    imagePreviewElement.style.filter = convertClassToFilterStyle(effectValue);
  };

  var imagePreviewElement = imageEditingFormElement.querySelector('.img-upload__preview img');
  pinSliderElement.addEventListener('mouseup', function () {
    movePin();
  });

  var restrictPin = function () {
    var pinPositionNumber = parseInt(pinSliderElement.style.left, 10);
    var offsetParentWidth = pinSliderElement.offsetParent.clientWidth;
    if (pinPositionNumber < 0) {
      pinSliderElement.style.left = 0;
    }
    if (pinPositionNumber > offsetParentWidth) {
      pinSliderElement.style.left = offsetParentWidth + 'px';
    }
  };

  pinSliderElement.addEventListener('mousedown', function (mouseDownEvt) {
    mouseDownEvt.preventDefault();
    pinSliderElement.focus();
    var startingCoordinatesMouseX = mouseDownEvt.clientX;

    var onPinMouseMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();
      var shiftCoordinatesMouse = startingCoordinatesMouseX - mouseMoveEvt.clientX;
      startingCoordinatesMouseX = mouseMoveEvt.clientX;
      movePin();

      var centerPinPercent = (pinSliderElement.clientWidth / 2) / 100;
      pinSliderElement.style.left = ((pinSliderElement.offsetLeft - shiftCoordinatesMouse) - centerPinPercent) + 'px';
      restrictPin();
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
      resetClassListFilter(imagePreviewElement, FILTER_CLASSES);
      imagePreviewElement.classList.add(filterClass);
      resetPosition(DEFAULT_SLAYDER_POSITION);
      hideOrShowSlider(filterClass, FILTER_DEFAULT_CLASS);
      imagePreviewElement.style.filter = '';
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

  var resetAffect = function () {
    imagePreviewElement.style = '';
    imagePreviewElement.className = '';
  };

  pinSliderElement.addEventListener('keydown', function (evt) {
    movePin();
    restrictPin();
    if (evt.keyCode === KEYCODE_LEFT) {
      pinSliderElement.style.left = (pinSliderElement.offsetLeft - PIN_MOVE_STEP) + 'px';
    }

    if (evt.keyCode === KEYCODE_RIGHT) {
      pinSliderElement.style.left = (pinSliderElement.offsetLeft + PIN_MOVE_STEP) + 'px';
    }
  });

  window.slider = {
    resetPosition: resetPosition,
    resetAffect: resetAffect,
  };

})();
