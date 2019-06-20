'use strict';

var AVATAR_URL_RANGE = {
  max: 6,
  min: 1,
};
var COMMENT_RANGE = {
  max: 5,
  min: 2,
};
var DEFAULT_SLAYDER_POSITION = 100;
var DEFAULT_VALUE_SIZE_FIELD = 100;
var DEFAULT_VALUE_SIZE_FIELD_TRANSFORM = 1;
var FILTER_CLASSES = [FILTER_DEFAULT_CLASS, 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
var FILTER_DEFAULT_CLASS = 'effects__preview--original';
var FILTER_MAX_VALUE = [1, 1, 100, 3, 3];
var FILTER_NAMES = ['grayscale', 'sepia', 'invert', 'blur', 'brightness'];
var KEY_CODE_ESC = 27;
var LIKE_RANGE = {
  max: 200,
  min: 15,
};
var MAX_SIZE = 100;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MIN_SIZE = 25;
var MOCK_QUANTITY = 25;
var NAMES = ['Николай', 'Иннокентий', 'Аркадий', 'Руслан', 'Эдуард', 'Ярослав', 'Лев', 'Виталий', 'Андрей', 'Тимофей', 'Павел', 'Сергей', 'Виктор'];
var NUMBER_SYSTEM = 10;
var RESIZING_STEP = 25;
var URL_PHOTO_MAX_QUANTITY = 25;

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
    return getRandomBoolean()
      ? -1
      : 1;
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
  return getRandomBoolean()
    ? firstOrder
    : secondOrder;
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

var imageEditingFormElement = document.querySelector('.img-upload'); // форма редактирования фото
var effectDepthSliderElement = imageEditingFormElement.querySelector('.img-upload__effect-level');

var sizeFieldElement = imageEditingFormElement.querySelector('.scale__control--value'); // поле размера фото;
var increaseFieldValue = function () { // Увеличивает значения поля размера фото
  var sizeFieldElementvalue = parseInt(sizeFieldElement.value, NUMBER_SYSTEM); // вытаскивает число из строки значения поля;
  if (sizeFieldElementvalue < MAX_SIZE) {
    sizeFieldElementvalue += RESIZING_STEP;
    sizeFieldElement.value = sizeFieldElementvalue + '%';
  }
  return sizeFieldElementvalue;
};

var imagePreviewElement = imageEditingFormElement.querySelector('.img-upload__preview img'); // Изображение на котором применяются фильтры
var resizePhotoPreview = function (value) {
  value = value / 100;
  imagePreviewElement.style.transform = 'scale(' + value + ')';
};

var onImageIncreaseButtonClick = function () { // увеличивает значения поля размера; // TODO: После модульности ПОМЕНЯТЬ НАЗВАНИЕ
  resizePhotoPreview(increaseFieldValue());
};

var decreaseFieldValue = function () { // Уменьшает значения поля размера фото
  var sizeFieldElementvalue = parseInt(sizeFieldElement.value, NUMBER_SYSTEM); // вытаскивает число из строки значения поля;
  if (sizeFieldElementvalue > MIN_SIZE) {
    sizeFieldElementvalue -= RESIZING_STEP;
    sizeFieldElement.value = sizeFieldElementvalue + '%';
  }
  return sizeFieldElementvalue;
};

var onImageDecreaseButtonClick = function () { // уменьшает значения поля размера; // TODO: После модульности ПОМЕНЯТЬ НАЗВАНИЕ
  resizePhotoPreview(decreaseFieldValue());
};

var pinSliderElement = effectDepthSliderElement.querySelector('.effect-level__pin');
var progressBarSliderElement = effectDepthSliderElement.querySelector('.effect-level__depth');

var imgUploadOverlayElement = imageEditingFormElement.querySelector('.img-upload__overlay');
var closeButtonImageEditingFormElement = imageEditingFormElement.querySelector('#upload-cancel');

var commentFormEditingElement = imageEditingFormElement.querySelector('.text__description');
var onImageEditingFormEsckey = function (evt) {
  var isCommentsfield = evt.target !== commentFormEditingElement; // Возвращает false если target это форма коментариев, иначе true;
  if (evt.keyCode === KEY_CODE_ESC && isCommentsfield) {
    closeImageEditingForm();
  }
};

var increaseButtonElement = imageEditingFormElement.querySelector('.scale__control--bigger');
var decreaseButtonElement = imageEditingFormElement.querySelector('.scale__control--smaller');

var resetPositionSlider = function (position) {
  pinSliderElement.style.left = position + '%';
  progressBarSliderElement.style.width = position + '%';
};

var openImageEditingForm = function () { // открывает попап редактирования;
  sizeFieldElement.value = DEFAULT_VALUE_SIZE_FIELD + '%'; // Устанавливает значение по умолчанию, для поля размера фото;
  imgUploadOverlayElement.classList.remove('hidden'); // Показывает попап редактирования;
  closeButtonImageEditingFormElement.addEventListener('click', onСloseButtonImageEditingFormClick);
  document.addEventListener('keydown', onImageEditingFormEsckey);
  increaseButtonElement.addEventListener('click', onImageIncreaseButtonClick); // TODO: После модульности ПОМЕНЯТЬ НАЗВАНИЕ
  decreaseButtonElement.addEventListener('click', onImageDecreaseButtonClick); // TODO: После модульности ПОМЕНЯТЬ НАЗВАНИЕ
  imagePreviewElement.style.transform = 'scale(' + DEFAULT_VALUE_SIZE_FIELD_TRANSFORM + ')'; // Сбрасывает размер изображения формы редактирования к дефолтному значению;
  resetPositionSlider(DEFAULT_SLAYDER_POSITION); // Сбрасывает прогресс бар и ручку глубины эфекта, в положение дефолта;
  effectDepthSliderElement.classList.add('hidden'); // скрываю слайдер прогресс бара;
};

var uploadFileFieldElement = imageEditingFormElement.querySelector('#upload-file');
uploadFileFieldElement.addEventListener('change', function () { // вешает обработчик на поле загрузки фото и слушает событие change;
  openImageEditingForm();
});

var closeImageEditingForm = function () { // закрывает попап редактирования;
  uploadFileFieldElement.value = ''; // сбрасываю значения поля. для повторной работы события 'change';
  imgUploadOverlayElement.classList.add('hidden');
  closeButtonImageEditingFormElement.removeEventListener('click', onСloseButtonImageEditingFormClick);
  document.removeEventListener('keydown', onImageEditingFormEsckey);
  increaseButtonElement.removeEventListener('click', onImageIncreaseButtonClick); // После модульности ПОМЕНЯТЬ НАЗВАНИЕ
  decreaseButtonElement.removeEventListener('click', onImageDecreaseButtonClick); // После модульности ПОМЕНЯТЬ НАЗВАНИЕ
};

var onСloseButtonImageEditingFormClick = function () { // Когда разобью на модули нужно ПОМЕНЯТЬ НАЗВАНИЕ.
  closeImageEditingForm();
};

var getPositionPinSliderPercent = function () {
  var positionLeftWidthPin = pinSliderElement.offsetLeft;
  var parentWidth = pinSliderElement.offsetParent.offsetWidth;

  var onePercent = parentWidth / 100;
  var percentPinWidth = positionLeftWidthPin / onePercent;
  return Math.round(percentPinWidth);
};

var convertPercentToFilterValue = function (unit, filsterMaxValue) {
  return filsterMaxValue / 100 * unit;
};

var convertClassToFilterStyle = function (effectValue) {
  var result = '';
  switch (imagePreviewElement.className) {
    case FILTER_CLASSES[1]: result = FILTER_NAMES[0] + '(' + convertPercentToFilterValue(effectValue, FILTER_MAX_VALUE[0]) + ')';
      break;
    case FILTER_CLASSES[2]: result = FILTER_NAMES[1] + '(' + convertPercentToFilterValue(effectValue, FILTER_MAX_VALUE[1]) + ')';
      break;
    case FILTER_CLASSES[3]: result = FILTER_NAMES[2] + '(' + convertPercentToFilterValue(effectValue, FILTER_MAX_VALUE[2]) + '%' + ')';
      break;
    case FILTER_CLASSES[4]: result = FILTER_NAMES[3] + '(' + convertPercentToFilterValue(effectValue, FILTER_MAX_VALUE[3]) + 'px' + ')';
      break;
    case FILTER_CLASSES[5]: result = FILTER_NAMES[4] + '(' + convertPercentToFilterValue(effectValue, FILTER_MAX_VALUE[4]) + ')';
      break;
  }
  return result;
};

var effectLevelValueElement = effectDepthSliderElement.querySelector('.effect-level__value'); // поле значения эфекта слайдера

pinSliderElement.addEventListener('mouseup', function () {
  var effectValue = effectLevelValueElement.value;
  effectValue = getPositionPinSliderPercent();
  imagePreviewElement.style.filter = convertClassToFilterStyle(effectValue);// накладываает фильтр
});

var resetClassListFilter = function (element, filterClasses) {
  filterClasses.forEach(function (nameClass) {
    element.classList.remove(nameClass);
  });
};

var hideOrShowSlider = function (filterClass, filterDefaultClass) {
  return filterClass !== filterDefaultClass
    ? effectDepthSliderElement.classList.remove('hidden')
    : effectDepthSliderElement.classList.add('hidden');
};

var addClassAddChangeEvent = function (imageFilterPreviewElement, filterClass) {
  imageFilterPreviewElement.addEventListener('click', function () {
    resetClassListFilter(imagePreviewElement, FILTER_CLASSES); // Удаляет старые классы фильтров с превью картинки;
    imagePreviewElement.classList.add(filterClass); // Добавляет класс фильтра на превью картинку;
    resetPositionSlider(DEFAULT_SLAYDER_POSITION); // Сбрасывает прогресс бар и ручку глубины эфекта, в положение дефолта;
    hideOrShowSlider(filterClass, FILTER_DEFAULT_CLASS); // Cкрывает или показывает слайдер изменения эффекта;
    imagePreviewElement.style.filter = ''; // сбрасываю инлайновые стили фильтров у главной картинки превью;
  });
};

var imagesFilterPreviewElements = imageEditingFormElement.querySelectorAll('.effects__item');
var addClassAddChangeEvents = function (imagesPreviewFilters, filterClasses) {
  imagesFilterPreviewElements.forEach(function (imagePreviewfilter, i) {
    var filterClass = filterClasses[i];
    addClassAddChangeEvent(imagePreviewfilter, filterClass);
  });
};

addClassAddChangeEvents(imagesFilterPreviewElements, FILTER_CLASSES);

// Максимум подвижности;


pinSliderElement.addEventListener('mousedown', function (mouseDownEvt) {
  mouseDownEvt.preventDefault();
  var startingCoordinatesMouseX = mouseDownEvt.clientX;

  var onPinMouseMove = function (mouseMoveEvt) {
    var shiftCoordinatesMouse = startingCoordinatesMouseX - mouseMoveEvt.clientX;
    startingCoordinatesMouseX = mouseMoveEvt.clientX;
    var offsetParentWidth = pinSliderElement.offsetParent.clientWidth;
    var pinPositionNumber = parseInt(pinSliderElement.style.left, NUMBER_SYSTEM);

    var effectValue = effectLevelValueElement.value;
    effectValue = getPositionPinSliderPercent();
    imagePreviewElement.style.filter = convertClassToFilterStyle(effectValue);// накладываает фильтр

    pinSliderElement.style.left = (pinSliderElement.offsetLeft - shiftCoordinatesMouse) + 'px';
    if (pinPositionNumber < 0) {
      pinSliderElement.style.left = 0;
    }
    if (pinPositionNumber > offsetParentWidth) {
      pinSliderElement.style.left = offsetParentWidth + 'px';
    }
  };
  document.addEventListener('mousemove', onPinMouseMove);

  var onSetupElementMouseUp = function (mouseUpEvt) {
    mouseUpEvt.preventDefault();
    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onSetupElementMouseUp);
  };

  document.addEventListener('mouseup', onSetupElementMouseUp);

});
