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

var AVATAR_URL_RANGE = {
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

var shuffleArray = function (arr) {
  return arr.sort(function () {
    return getRandomBoolean() ? -1 : 1;
  });
};

var getRandomLike = function (like) {
  return getRandomNumber(like.min, like.max);
};

var getRandomAvatarUrl = function (avatarUrlRange) {
  return 'img/avatar-' + getRandomNumber(avatarUrlRange.min, avatarUrlRange.max) + '.svg';
};

var getRandomTextMessage = function (messages) {
  var firstOrder = getRandomArrayValue(messages) + ' ' + getRandomArrayValue(messages);
  var secondOrder = getRandomArrayValue(messages);
  return getRandomBoolean() ? firstOrder : secondOrder;
};

var getRandomQuantityComments = function (commentRange) {
  return getRandomNumber(commentRange.min, commentRange.max);
};

var getRandomName = function (names) {
  return getRandomArrayValue(names);
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
    counter = counter >= urlPhotoMaxQuantity ? 0 : counter;
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
urlPhotos = shuffleArray(urlPhotos);
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

renderPhotosElements(simulationPictureElement, photoMocks);

// Решение задания: подробности;

// 1.1 Открытие закрытие формы редактирования;
var formElement = document.querySelector('.img-upload'); // форма редактирования фото
var uploadFileFieldElement = formElement.querySelector('#upload-file');
var imgUploadOverlayElement = formElement.querySelector('.img-upload__overlay');
var closeButtonImageEditingFormElement = formElement.querySelector('#upload-cancel');

var onСloseButtonImageEditingFormClick = function () { // не уверен в названии;
  closeImageEditingForm();
};

var openImageEditingForm = function () { // открывает попап редактирования;
  sizeFieldElement.value = DEFAULT_VALUE_SIZE_FIELD + '%'; // Устанавливает значение по умолчанию, для поля размера фото;

  imgUploadOverlayElement.classList.remove('hidden');
  closeButtonImageEditingFormElement.addEventListener('click', onСloseButtonImageEditingFormClick);
  document.addEventListener('keydown', onImageEditingFormEscPress);
  increaseButtonElement.addEventListener('click', onIncreaseButtonClick);
  decreaseButtonElement.addEventListener('click', onDecreaseButtonClick);
  imagePreview.style.transform = 'scale(' + DEFAULT_VALUE_SIZE_FIELD_TRANSFORM + ')'; // сбрасывает размер изображения формы редактирования к дефолтному значению;
};

var closeImageEditingForm = function () { // закрывает попап редактирования;
  uploadFileFieldElement.value = ''; // сбрасываю значения поля. для поторной работы события 'change';
  imgUploadOverlayElement.classList.add('hidden');
  closeButtonImageEditingFormElement.removeEventListener('click', onСloseButtonImageEditingFormClick);
  document.removeEventListener('keydown', onImageEditingFormEscPress);
  increaseButtonElement.removeEventListener('click', onIncreaseButtonClick);
  decreaseButtonElement.removeEventListener('click', onDecreaseButtonClick);
};

uploadFileFieldElement.addEventListener('change', function () { // вешает обработчик на поле загрузки фото и слушает событие change;
  openImageEditingForm();
});

var KEY_CODE_ESC = 27;
var onImageEditingFormEscPress = function (evt) { // не уверен в названии;
  if (evt.keyCode === KEY_CODE_ESC) {
    closeImageEditingForm();
  }
};

// 1.2 Редактирование размера изображения;

// 1.2.1 Изменение поля размера фото
var DEFAULT_VALUE_SIZE_FIELD = 100;
var DEFAULT_VALUE_SIZE_FIELD_TRANSFORM = 1;

var RESIZING_STEP = 25;
var MIN_SIZE = 25;
var MAX_SIZE = 100;
var NUMBER_SYSTEM = 10;

var sizeFieldElement = formElement.querySelector('.scale__control--value'); // поле размера фото;
var increaseButtonElement = formElement.querySelector('.scale__control--bigger');
var decreaseButtonElement = formElement.querySelector('.scale__control--smaller');

var increaseFieldValue = function () { // Увеличивает значения поля размера фото
  var sizeFieldElementvalue = parseInt(sizeFieldElement.value, NUMBER_SYSTEM); // вытаскивает число из строки значения поля;
  if (sizeFieldElementvalue < MAX_SIZE) {
    sizeFieldElementvalue += RESIZING_STEP;
    sizeFieldElement.value = sizeFieldElementvalue + '%';
  }
  return sizeFieldElementvalue;
};

var decreaseFieldValue = function () { // Уменьшает значения поля размера фото
  var sizeFieldElementvalue = parseInt(sizeFieldElement.value, NUMBER_SYSTEM); // вытаскивает число из строки значения поля;
  if (sizeFieldElementvalue > MIN_SIZE) {
    sizeFieldElementvalue -= RESIZING_STEP;
    sizeFieldElement.value = sizeFieldElementvalue + '%';
  }
  return sizeFieldElementvalue;
};

var onIncreaseButtonClick = function () { // Не уверен в названии, функция обработчика увеличения значения поля размера;
  resizePhotoPreview(increaseFieldValue());
};

var onDecreaseButtonClick = function () { // Не уверен в названии, функция обработчика уменьшения значения поля размера;
  resizePhotoPreview(decreaseFieldValue());
};

// 1.2.2  Изменение размера фото
var imagePreview = formElement.querySelector('.img-upload__preview img');
var resizePhotoPreview = function (value) {
  value = value / 100;
  imagePreview.style.transform = 'scale(' + value + ')';
};

// 1.3 Наложение эффекта на изображение:

// 1.3.1 Добавляет класс изображению формы редактирования, через клик по превью картинке;
var FILTER_DEFAULT_CLASS = 'effects__preview--original';
var FILTER_CLASSES = [FILTER_DEFAULT_CLASS, 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
var imagesFilterPreviewElements = formElement.querySelectorAll('.effects__item');

var addClassAddChangeEvent = function (imageFilterPreviewElement, filterClass) {
  imageFilterPreviewElement.addEventListener('change', function () {
    resetClassListFilter(imagePreview, FILTER_CLASSES);
    imagePreview.classList.add(filterClass);
  });
};

var addClassAddChangeEvents = function (imagesPreviewFilters, filterClasses) {
  imagesFilterPreviewElements.forEach(function (imagePreviewfilter, i) {
    var filterClass = filterClasses[i];
    addClassAddChangeEvent(imagePreviewfilter, filterClass);
  });
};

var resetClassListFilter = function (element, filterClasses) {
  filterClasses.forEach(function (nameClass) {
    element.classList.remove(nameClass);
  });
};

addClassAddChangeEvents(imagesFilterPreviewElements, FILTER_CLASSES);

// Меняет интенсивность эффекта через перемещением ползунка в слайдереж;
