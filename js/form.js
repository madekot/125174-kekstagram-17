'use strict';
(function () {
  var imageEditingFormElement = document.querySelector('.img-upload');
  var commentFormEditingElement = imageEditingFormElement.querySelector('.text__description');
  var checkOnFocus = function (evt) {
    return evt.target !== commentFormEditingElement;
  };

  window.form = {
    checkOnFocus: checkOnFocus,
  };
})();
