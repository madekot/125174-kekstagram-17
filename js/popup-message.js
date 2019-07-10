'use strict';
(function () {
  var main = document.querySelector('main');

  var showMessage = function (message, buttonClose, secondButtonClose) {
    window.preview.close();
    var closeMessage = function () {
      message.parentElement.removeChild(message);
      document.removeEventListener('keydown', onKeyPressESC);
      document.removeEventListener('click', onClick);
    };

    var onKeyPressESC = function (evt) {
      if (window.utility.keyboard.isEscPressed(evt)) {
        closeMessage();
      }
    };

    var onClick = function (evt) {
      if (evt.target === message) {
        closeMessage();
      }
    };

    buttonClose.addEventListener('click', function () {
      closeMessage();
    });

    if (secondButtonClose) {
      secondButtonClose.addEventListener('click', function () {
        closeMessage();
      });
    }

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyPressESC);

    main.appendChild(message);
  };

  var showSuccessMessage = function () {
    var templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
    var message = templateSuccessMessage.cloneNode(true);
    var buttonClose = message.querySelector('.success__button');
    showMessage(message, buttonClose);
  };

  var showErrorMessage = function () {
    var templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
    var message = templateErrorMessage.cloneNode(true);
    var buttonsClose = message.querySelectorAll('.error__button');
    var firstButtonClose = buttonsClose[0];
    var secondButtonClose = buttonsClose[1];
    showMessage(message, firstButtonClose, secondButtonClose);
  };

  window.popupMessage = {
    showSuccess: showSuccessMessage,
    showError: showErrorMessage,
  };

})();
