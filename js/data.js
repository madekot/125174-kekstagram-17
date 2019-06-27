'use strict';
(function () {

  var AVATAR_URL_RANGE = {
    max: 6,
    min: 1,
  };
  var COMMENT_RANGE = {
    max: 5,
    min: 2,
  };

  var LIKE_RANGE = {
    max: 200,
    min: 15,
  };

  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var MOCK_QUANTITY = 25;
  var NAMES = ['Николай', 'Иннокентий', 'Аркадий', 'Руслан', 'Эдуард', 'Ярослав', 'Лев', 'Виталий', 'Андрей', 'Тимофей', 'Павел', 'Сергей', 'Виктор'];
  var URL_PHOTO_MAX_QUANTITY = 25;

  var getRandomLike = function (like) {
    return window.utility.random.number(like.min, like.max);
  };

  var getRandomAvatarUrl = function (avatarUrlRange) {
    return 'img/avatar-' + window.utility.random.number(avatarUrlRange.min, avatarUrlRange.max) + '.svg';
  };

  var getRandomTextMessage = function (messages) {
    var firstOrder = window.utility.random.arrayElement(messages) + ' ' + window.utility.random.arrayElement(messages);
    var secondOrder = window.utility.random.arrayElement(messages);
    return window.utility.random.boolean()
      ? firstOrder
      : secondOrder;
  };

  var getRandomQuantityComments = function (commentRange) {
    return window.utility.random.number(commentRange.min, commentRange.max);
  };

  var getRandomName = function (names) {
    return window.utility.random.arrayElement(names);
  };

  var createMockComments = function (avatarUrlRange, messages, names, commentRange) {
    var result = [];
    for (var i = 0; i < getRandomQuantityComments(commentRange); i++) {
      result[i] = {
        avatar: getRandomAvatarUrl(avatarUrlRange),
        message: getRandomTextMessage(messages),
        name: getRandomName(names),
      };
    }
    return result;
  };

  var createIndexPhotosСounter = function (urlPhotoMaxQuantity) {
    var counter = 0;
    return function () {
      counter = counter >= urlPhotoMaxQuantity
        ? 0
        : counter;
      return counter++;
    };
  };

  var createUrlPhotos = function (urlPhotoMaxQuantity) {
    var results = [];
    for (var i = 0; i < urlPhotoMaxQuantity; i++) {
      results[i] = 'photos/' + (i + 1) + '.jpg';
    }
    return results;
  };

  var urlPhotos = createUrlPhotos(URL_PHOTO_MAX_QUANTITY);
  urlPhotos = window.utility.random.shuffleArray(urlPhotos);
  var getIndexUrlPhoto = createIndexPhotosСounter(URL_PHOTO_MAX_QUANTITY);

  var createMockDescriptionPhoto = function (photos, likeRange, avatarUrlRange, messages, names, commentRange) {
    return {
      url: photos[getIndexUrlPhoto()],
      likes: getRandomLike(likeRange),
      message: createMockComments(avatarUrlRange, messages, names, commentRange),
    };
  };

  var createMockDescriptionPhotos = function (quantityMock, photos, likeRange, avatarUrlRange, messages, names, commentRange) {
    var result = [];
    for (var i = 0; i < quantityMock; i++) {
      result[i] = createMockDescriptionPhoto(photos, likeRange, avatarUrlRange, messages, names, commentRange);
    }
    return result;
  };

  var photoMocks = createMockDescriptionPhotos(MOCK_QUANTITY, urlPhotos, LIKE_RANGE, AVATAR_URL_RANGE, MESSAGES, NAMES, COMMENT_RANGE);
  window.data = photoMocks;
})();
