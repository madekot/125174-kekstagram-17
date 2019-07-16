'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserElement = document.querySelector('#upload-file');
  var previewElement = document.querySelector('.img-upload__preview img');

  var changeImageEffectPreview = function (readerResult) {
    var effectsPreviewElements = document.querySelectorAll('.effects__preview');
    effectsPreviewElements.forEach(function (previewImageElement) {
      previewImageElement.style.backgroundImage = 'url("' + readerResult + '")';
    });
  };

  fileChooserElement.addEventListener('change', function () {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var readerResult = reader.result;
        previewElement.src = readerResult;
        changeImageEffectPreview(readerResult);
      });

      reader.readAsDataURL(file);
    }
  });
})();
