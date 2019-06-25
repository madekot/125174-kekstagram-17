'use strict';
(function () {
  var imageEditingFormElement = document.querySelector('.img-upload'); // форма редактирования фото
  var commentFormEditingElement = imageEditingFormElement.querySelector('.text__description');
  var checkFormOnFocus = function (evt) { // Возвращает false если target это форма коментариев, иначе true;
    return evt.target !== commentFormEditingElement;
  };

  window.form = {
    checkFormOnFocus: checkFormOnFocus,
  };
})();
