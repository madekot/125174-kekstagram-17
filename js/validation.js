'use strict';
(function () {
  var SIMBOL_HASHTAG = '#';
  var POSITION_HASHTAG = 1;
  var MIN_LENGTH_HASHTAG = 1;
  var MAX_LENGTH_HASHTAG = 20;
  var MAX_LENGTH_HASHTAGS = 5;

  var checksIsFirstSimbolHashtag = function (hashtag) {
    return hashtag.charAt(0) === SIMBOL_HASHTAG || hashtag.charAt(0) === '';
  };

  var checksIsMaxLengthHashtag = function (hashtag) {
    return hashtag.length < MAX_LENGTH_HASHTAG;
  };

  var checksIsContentHashtag = function (hashtag) {
    return hashtag.charAt(0) !== SIMBOL_HASHTAG || hashtag.length > MIN_LENGTH_HASHTAG;
  };

  var checksIsSeparationHashtags = function (hashtag) {
    return hashtag.indexOf(SIMBOL_HASHTAG, POSITION_HASHTAG) === -1 ? true : false;
  };

  var remakeToLowerCase = function (hashtags) {
    var cloneHashtags = hashtags.slice();
    for (var i = 0; i < cloneHashtags.length; i++) {
      var hashtag = cloneHashtags[i].toLowerCase();
      cloneHashtags[i] = hashtag;
    }
    return cloneHashtags;
  };

  var checksIsLengthHashtags = function (hashtags) {
    var cloneHashtags = remakeToLowerCase(hashtags);
    var startingSearch = 1;
    for (var i = 0; i < cloneHashtags.length; i++) {
      var positionIndexRecurrence = cloneHashtags.indexOf(cloneHashtags[i].toLowerCase(), startingSearch++);
      if (positionIndexRecurrence !== -1) {
        return false;
      }
    }
    return true;
  };

  var removeReplays = function (arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];
      obj[str] = true;
    }
    return Object.keys(obj);
  };

  var checksIsMaxLengthHashtags = function (hashtags) {
    return hashtags.length <= MAX_LENGTH_HASHTAGS;
  };

  var getMessageError = function (hashtags) {
    var message = [];
    if (!checksIsMaxLengthHashtags(hashtags)) {
      message.push('Нельзя указывать больше пяти хэш-тегов');
    }
    if (!checksIsLengthHashtags(hashtags)) {
      message.push('Один и тот же хэш-тег не может быть использован дважды');
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      if (!checksIsFirstSimbolHashtag(hashtag)) {
        message.push('Хеш-тегу нужно начинается с символа #');
      }
      if (!checksIsContentHashtag(hashtag)) {
        message.push('Хеш-тег не может состоять только из #;');
      }
      if (!checksIsSeparationHashtags(hashtag)) {
        message.push('Хэш-теги нужно разделять пробелами');
      }
      if (!checksIsMaxLengthHashtag(hashtag)) {
        message.push('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      }
    }

    return removeReplays(message).join('. \n');
  };

  var hashtagsElement = document.querySelector('.text__hashtags');
  var clearCustomValidity = function () {
    hashtagsElement.setCustomValidity('');
  };

  var checksIsValidation = function () {
    var hashtags = hashtagsElement.value.trim().split(' ');
    var messages = getMessageError(hashtags);
    clearCustomValidity();
    if (messages.length !== 0) {
      hashtagsElement.setCustomValidity(messages);
    }
  };

  window.validation = {
    checks: checksIsValidation,
  };
})();
