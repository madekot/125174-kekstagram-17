'use strict';
(function () {

  var imageEditingFormElement = document.querySelector('.img-upload');
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

  var openImageEditingForm = function () {
    window.form.clearDescription();
    window.slider.resetAffect();
    window.resizePhotoPreview.reset();
    imgUploadOverlayElement.classList.remove('hidden');
    closeButtonImageEditingFormElement.addEventListener('click', onСloseButtonImageEditingFormClick);
    document.addEventListener('keydown', onImageEditingFormEsckey);
    window.resizePhotoPreview.addHandlersButton();
    window.slider.resetPosition();
    effectDepthSliderElement.classList.add('hidden');
  };

  var uploadFileFieldElement = imageEditingFormElement.querySelector('#upload-file');
  uploadFileFieldElement.addEventListener('change', function () {
    openImageEditingForm();
  });

  var closeImageEditingForm = function () {
    uploadFileFieldElement.value = '';
    imgUploadOverlayElement.classList.add('hidden');
    closeButtonImageEditingFormElement.removeEventListener('click', onСloseButtonImageEditingFormClick);
    document.removeEventListener('keydown', onImageEditingFormEsckey);
    window.resizePhotoPreview.removeHandlersButton();
  };

  var onСloseButtonImageEditingFormClick = function () {
    closeImageEditingForm();
  };

  window.preview = {
    close: closeImageEditingForm,
  };

})();
