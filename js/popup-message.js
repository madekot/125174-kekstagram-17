'use strict';
(function () {
  var mainElement = document.querySelector('main');

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

    mainElement.appendChild(message);
  };

  var showSuccessMessage = function () {
    var templateSuccessMessageElement = document.querySelector('#success').content.querySelector('.success');
    var messageElement = templateSuccessMessageElement.cloneNode(true);
    var buttonCloseElement = messageElement.querySelector('.success__button');
    showMessage(messageElement, buttonCloseElement);
  };

  var showErrorMessage = function () {
    var templateErrorMessageElement = document.querySelector('#error').content.querySelector('.error');
    var messageElement = templateErrorMessageElement.cloneNode(true);
    var buttonsClose = messageElement.querySelectorAll('.error__button');
    var firstButtonClose = buttonsClose[0];
    var secondButtonClose = buttonsClose[1];
    showMessage(messageElement, firstButtonClose, secondButtonClose);
  };

  window.popupMessage = {
    showSuccess: showSuccessMessage,
    showError: showErrorMessage,
  };

})();
