'use strict';

var QUANTITY_MOCK = 25;

var NAMES = ['Николай', 'Иннокентий', 'Аркадий', 'Руслан', 'Эдуард', 'Ярослав', 'Лев', 'Виталий', 'Андрей', 'Эдуард', 'Тимофей', 'Павел', 'Сергей', 'Виктор'];

var URL_NUMBER = {
  min: 1,
  max: 25,
};

var LIKE_NUMBER = {
  min: 15,
  max: 200,
};

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var AVATAR_URL_NUMBER = {
  min: 1,
  max: 6,
};

var getRandomNumber = function (min, max) {
  var result = min - 0.5 + Math.random() * (max - min + 1);
  result = Math.round(result);
  return result;
};

var getRandomArrayValue = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

var getRandomUrl = function (photoUrl) {
  return 'photos/' + getRandomNumber(photoUrl.min, photoUrl.max) + '.jpg';
};

var getRandomLike = function (like) {
  return getRandomNumber(like.min, like.max);
};

var getRandomAvatarUrl = function (avatarUrl) {
  return 'img/avatar-' + getRandomNumber(avatarUrl.min, avatarUrl.max) + '.svg';
};

var getRandomComment = function (comments) {
  return getRandomArrayValue(comments);
};

var getRandomName = function (names) {
  return getRandomArrayValue(names);
};

var createMockComment = function (avatarUrl, comments, names) {
  return {
    avatar: getRandomAvatarUrl(avatarUrl),
    message: getRandomComment(comments),
    name: getRandomName(names),
  };
};

var createMockDescriptionPhoto = function (photoUrl, like, avatarUrl, comments, names) {
  return {
    url: getRandomUrl(photoUrl),
    likes: getRandomLike(like),
    comments: createMockComment(avatarUrl, comments, names),
  };
};

var createMockDescriptionPhotos = function (quantityMock, photoUrl, like, avatarUrl, comments, names) {
  var result = [];
  for (var i = 0; i < quantityMock; i++) {
    result[i] = createMockDescriptionPhoto(photoUrl, like, avatarUrl, comments, names);
  }
  return result;
};

var photos = createMockDescriptionPhotos(QUANTITY_MOCK, URL_NUMBER, LIKE_NUMBER, AVATAR_URL_NUMBER, COMMENTS, NAMES);
