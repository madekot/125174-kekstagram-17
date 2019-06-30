'use strict';
(function () {
  var SET_TIMEOUT = 10000; // 10s

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

  window.backend = {
    load: load,
  };
})();
