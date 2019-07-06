'use strict';
(function () {

  var imageEditingFormElement = document.querySelector('.img-upload'); // форма редактирования фото
  var effectDepthSliderElement = imageEditingFormElement.querySelector('.img-upload__effect-level');

  var imgUploadOverlayElement = imageEditingFormElement.querySelector('.img-upload__overlay');
  var closeButtonImageEditingFormElement = imageEditingFormElement.querySelector('#upload-cancel');
  var commentFormEditingElement = imageEditingFormElement.querySelector('.text__description');
  var hashtagsElement = document.querySelector('.text__hashtags');

  var onImageEditingFormEsckey = function (evt) {
    if (window.utility.keyboard.isEscPressed(evt) && window.form.checkOnFocus(evt, commentFormEditingElement) && window.form.checkOnFocus(evt, hashtagsElement)) {
      closeImageEditingForm();
    }
  };

  var openImageEditingForm = function () { // открывает попап редактирования;
    window.resizePhotoPreview.reset(); // Устанавливает значение по умолчанию, для поля размера фото;
    imgUploadOverlayElement.classList.remove('hidden'); // Показывает попап редактирования;
    closeButtonImageEditingFormElement.addEventListener('click', onСloseButtonImageEditingFormClick);
    document.addEventListener('keydown', onImageEditingFormEsckey);
    window.resizePhotoPreview.addHandlersButton();
    window.slider.resetPosition(); // Сбрасывает прогресс бар и ручку глубины эфекта, в положение дефолта;
    effectDepthSliderElement.classList.add('hidden'); // скрываю слайдер прогресс бара;
  };

  var uploadFileFieldElement = imageEditingFormElement.querySelector('#upload-file');
  uploadFileFieldElement.addEventListener('change', function () { // вешает обработчик на поле загрузки фото и слушает событие change;
    openImageEditingForm();
  });

  var closeImageEditingForm = function () { // закрывает попап редактирования;
    uploadFileFieldElement.value = ''; // сбрасываю значения поля. для повторной работы события 'change';
    imgUploadOverlayElement.classList.add('hidden');
    closeButtonImageEditingFormElement.removeEventListener('click', onСloseButtonImageEditingFormClick);
    document.removeEventListener('keydown', onImageEditingFormEsckey);
    window.resizePhotoPreview.removeHandlersButton();
  };

  var onСloseButtonImageEditingFormClick = function () { // Когда разобью на модули нужно ПОМЕНЯТЬ НАЗВАНИЕ.
    closeImageEditingForm();
  };

})();
