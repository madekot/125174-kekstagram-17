'use strict';
(function () {
  var SET_TIMEOUT = 10000; // 10s
  var formElement = document.querySelector('#upload-select-image');

  var addListenerLoad = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        case 500:
          error = 'Ошибка сервера';
          break;

        default:
          error = 'Статус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });
  };

  var addListenerError = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
  };

  var addListenerTimeOut = function (xhr, onError, setTimeout) {
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = setTimeout;
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    addListenerLoad(xhr, onLoad, onError);
    addListenerError(xhr, onError);
    addListenerTimeOut(xhr, onError, SET_TIMEOUT);

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    data.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var formData = new FormData(data);
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      addListenerLoad(xhr, onLoad, onError);
      addListenerError(xhr, onError);
      addListenerTimeOut(xhr, onError, SET_TIMEOUT);

      xhr.open('POST', 'https://js.dump.academy/kekstagram');
      xhr.send(formData);
    });
  };

  var dataCards = [];
  var onLoad = function (data) {
    dataCards = data;
    window.picture.render(dataCards);
  };

  var onSave = function () {
    window.popupMessage.showSuccess();
  };

  var onError = function () {
    window.popupMessage.showError();
  };

  load(onLoad);
  save(formElement, onSave, onError);

  var getDataCards = function () {
    return dataCards;
  };

  window.backend = {
    load: load,
    data: getDataCards,
  };
})();
