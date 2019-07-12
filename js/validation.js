'use strict';
(function () {
  var SYMBOL_HASHTAG = '#';
  var POSITION_HASHTAG = 1;
  var MIN_LENGTH_HASHTAG = 1;
  var MAX_LENGTH_HASHTAG = 20;
  var MAX_LENGTH_HASHTAGS = 5;

  var checksIsFirstSymbolHashtag = function (hashtag) {
    return hashtag.charAt(0) === SYMBOL_HASHTAG || hashtag.charAt(0) === '';
  };

  var checkIsMaxLengthHashtag = function (hashtag) {
    return hashtag.length < MAX_LENGTH_HASHTAG;
  };

  var checkHasContentHashtag = function (hashtag) {
    return hashtag.charAt(0) !== SYMBOL_HASHTAG || hashtag.length > MIN_LENGTH_HASHTAG;
  };

  var checkIsSeparatedHashtags = function (hashtag) {
    return hashtag.indexOf(SYMBOL_HASHTAG, POSITION_HASHTAG) === -1;
  };

  var getHashtagsArr = function (HashtagsStr) {
    return HashtagsStr.trim().split(' ').filter(function (hashtag) {
      return hashtag !== '';
    });
  };

  var hashtagsElement = document.querySelector('.text__hashtags');

  var checkIsDuplicateHashtags = function () {
    var hashtags = getHashtagsArr(hashtagsElement.value.toLowerCase());
    var startingSearch = 1;
    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      var positionIndexRecurrence = hashtags.indexOf(hashtag, startingSearch++);
      if (positionIndexRecurrence !== -1) {
        return false;
      }
    }
    return true;
  };

  var checkIsMaxLengthHashtags = function (hashtags) {
    return hashtags.length <= MAX_LENGTH_HASHTAGS;
  };

  var getMessageHashtagsError = function (messageObj, hashtags) {
    if (!checkIsMaxLengthHashtags(hashtags)) {
      messageObj.maxLengthHashtags = 'Нельзя указывать больше пяти хэш-тегов.';
    }
    if (!checkIsDuplicateHashtags(hashtags)) {
      messageObj.duplicateHashtags = 'Один и тот же хэш-тег не может быть использован дважды.';
    }
  };

  var getMessageHashtagError = function (messageObj, hashtags) {
    hashtags.forEach(function (hashtag) {
      if (!checksIsFirstSymbolHashtag(hashtag)) {
        messageObj.firstSymbolHashtag = 'Хеш-тегу нужно начинается с символа #.';
      }
      if (!checkHasContentHashtag(hashtag)) {
        messageObj.hasContentHashtag = 'Хеш-тег не может состоять только из #';
      }
      if (!checkIsSeparatedHashtags(hashtag)) {
        messageObj.separatedHashtags = 'Хэш-теги нужно разделять пробелами.';
      }
      if (!checkIsMaxLengthHashtag(hashtag)) {
        messageObj.maxLengthHashtag = 'Максимальная длина одного хэш-тега 20 символов, включая решётку.';
      }
    });
  };

  var messageErrorJoin = function (messageObj) {
    var message = '';
    for (var hastag in messageObj) {
      if ({}.hasOwnProperty.call(messageObj, hastag)) {
        message += messageObj[hastag] + ' \n';
      }
    }
    return message;
  };

  var getMessageError = function () {
    var messageObj = {};
    var hashtags = getHashtagsArr(hashtagsElement.value);
    getMessageHashtagsError(messageObj, hashtags);
    getMessageHashtagError(messageObj, hashtags);
    return messageErrorJoin(messageObj);
  };

  var clearCustomValidity = function () {
    hashtagsElement.setCustomValidity('');
  };

  var setHashtagField = function () {
    var hashtags = getHashtagsArr(hashtagsElement.value);
    hashtagsElement.value = hashtags.join(' ');
  };

  var clearFieldHashtag = function () {
    hashtagsElement.value = '';
  };

  var showErrorField = function (message) {
    if (message) {
      hashtagsElement.style.borderColor = 'red';
    } else {
      hashtagsElement.style.borderColor = '';
    }
  };

  var checkIsValid = function () {
    clearCustomValidity();
    var messages = getMessageError();
    hashtagsElement.setCustomValidity(messages);
    showErrorField(messages);
    setHashtagField();
  };

  window.validation = {
    check: checkIsValid,
    clearFieldHashtag: clearFieldHashtag,
  };
})();
