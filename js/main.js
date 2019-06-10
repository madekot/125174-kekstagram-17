'use strict';

var MOCK_QUANTITY = 25;

var NAMES = ['Николай', 'Иннокентий', 'Аркадий', 'Руслан', 'Эдуард', 'Ярослав', 'Лев', 'Виталий', 'Андрей', 'Тимофей', 'Павел', 'Сергей', 'Виктор'];

var URL_PHOTO_MAX_QUANTITY = 25;

var LIKE_RANGE = {
  min: 15,
  max: 200,
};

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var COMMENT_RANGE = {
  min: 2,
  max: 5,
};

var AVATAR_URL_NUMBER = {
  min: 1,
  max: 6,
};

var getRandomBoolean = function () {
  return Boolean(getRandomNumber(0, 1));
};

var getRandomNumber = function (min, max) {
  var result = min - 0.5 + Math.random() * (max - min + 1);
  result = Math.round(result);
  return result;
};

var getRandomArrayValue = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

var shuffleRandomArray = function (arr) {
  return arr.sort(function () {
    return getRandomBoolean() ? -1 : 1;
  });
};

var getRandomLike = function (like) {
  return getRandomNumber(like.min, like.max);
};

var getRandomAvatarUrl = function (avatarUrl) {
  return 'img/avatar-' + getRandomNumber(avatarUrl.min, avatarUrl.max) + '.svg';
};

var getRandomTextMessage = function (messages) {
  var firstOrder = getRandomArrayValue(messages) + ' ' + getRandomArrayValue(messages);
  var secondOrder = getRandomArrayValue(messages);
  return getRandomBoolean() ? firstOrder : secondOrder;
};

var getRandomQuantityComments = function (commentQuantity) {
  return getRandomNumber(commentQuantity.min, commentQuantity.max);
};

var getRandomName = function (names) {
  return getRandomArrayValue(names);
};

var createMockComments = function (avatarUrl, messages, names, commentQuantity) {
  var result = [];
  for (var i = 0; i < getRandomQuantityComments(commentQuantity); i++) {
    result[i] = {
      avatar: getRandomAvatarUrl(avatarUrl),
      message: getRandomTextMessage(messages),
      name: getRandomName(names),
    };
  }
  return result;
};

var createIndexPhotosСounter = function (urlMaxQuantity) {
  var counter = 0;
  return function () {
    counter = counter >= urlMaxQuantity ? 0 : counter;
    return counter++;
  };
};

var createUrlPhotos = function (urlMaxQuantity) {
  var results = [];
  for (var i = 0; i < urlMaxQuantity; i++) {
    results[i] = 'photos/' + (i + 1) + '.jpg';
  }
  return results;
};

var urlPhotos = createUrlPhotos(URL_PHOTO_MAX_QUANTITY);
urlPhotos = shuffleRandomArray(urlPhotos);
var getIndexUrlPhoto = createIndexPhotosСounter(URL_PHOTO_MAX_QUANTITY);

var createMockDescriptionPhoto = function (photos, likeRange, avatarUrl, messages, names, commentRange) {
  return {
    url: photos[getIndexUrlPhoto()],
    likes: getRandomLike(likeRange),
    message: createMockComments(avatarUrl, messages, names, commentRange),
  };
};

var createMockDescriptionPhotos = function (quantityMock, photos, likeRange, avatarUrl, messages, names, commentRange) {
  var result = [];
  for (var i = 0; i < quantityMock; i++) {
    result[i] = createMockDescriptionPhoto(photos, likeRange, avatarUrl, messages, names, commentRange);
  }
  return result;
};

var photosElements = createMockDescriptionPhotos(MOCK_QUANTITY, urlPhotos, LIKE_RANGE, AVATAR_URL_NUMBER, MESSAGES, NAMES, COMMENT_RANGE);
var templatePictureElement = document.querySelector('#picture').content.querySelector('.picture');
var simulationPictureElement = document.querySelector('.pictures');

var createPhotoElement = function (coment) {
  var photoElement = templatePictureElement.cloneNode(true);
  var imageElement = photoElement.querySelector('.picture__img');
  imageElement.src = coment.url;
  var likeElement = photoElement.querySelector('.picture__likes');
  likeElement.textContent = coment.likes;
  var commentElement = photoElement.querySelector('.picture__comments');
  commentElement.textContent = coment.message.length;
  return photoElement;
};

var renderPhotosElements = function (simulationParrentElement, mockArr) {
  var fragment = document.createDocumentFragment();
  mockArr.forEach(function (photo) {
    var photoElement = createPhotoElement(photo);
    fragment.appendChild(photoElement);
  });
  simulationParrentElement.appendChild(fragment);
};

renderPhotosElements(simulationPictureElement, photosElements);
