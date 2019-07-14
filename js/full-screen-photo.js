'use strict';
(function () {
  var AVATAR_MIN_NUMBER = 1;
  var AVATAR_MAX_NUMBER = 6;
  var listCommentsElement = document.querySelector('.social__comments');
  var bigPictureElement = document.querySelector('.big-picture');
  var closeButtonBigPictureElement = bigPictureElement.querySelector('#picture-cancel');

  var addComment = function (textContent) {
    var templateElement = document.querySelector('#social__comment').content.querySelector('.social__comment');
    var liElement = templateElement.cloneNode(true);
    var imageElement = liElement.querySelector('.social__picture');
    var paragraphElement = liElement.querySelector('.social__text');
    imageElement.src = 'img/avatar-' + window.utility.random.number(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER) + '.svg';
    paragraphElement.textContent = textContent;
    return liElement;
  };

  var addComments = function (comments) {
    var fragment = document.createDocumentFragment();
    comments.forEach(function (comment) {
      var message = comment.message;
      var commentElement = addComment(message);
      fragment.appendChild(commentElement);
    });
    listCommentsElement.appendChild(fragment);
  };

  var setDescription = function (descriptionText) {
    var descriptionElement = bigPictureElement.querySelector('.social__caption');
    descriptionElement.textContent = descriptionText;
  };

  var clearComments = function () {
    listCommentsElement.innerHTML = '';
  };

  var openBigPicture = function () {
    bigPictureElement.classList.remove('hidden');
    document.addEventListener('keydown', oncloseButtonBigPictureElementKeyDown);
    window.commentsMore.hidden();
  };

  var buttonMoreComment = document.querySelector('.social__comments-loader');
  buttonMoreComment.addEventListener('click', function () {
    window.commentsMore.show();
    window.commentsMore.setCommentsCount();
  });

  var closeBigPicture = function () {
    bigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', oncloseButtonBigPictureElementKeyDown);
  };

  closeButtonBigPictureElement.addEventListener('click', function () {
    closeBigPicture();
  });

  var oncloseButtonBigPictureElementKeyDown = function (evt) {
    if (window.utility.keyboard.isEscPressed(evt)) {
      closeBigPicture();
    }
  };

  var addInformation = function (data, index) {
    var image = bigPictureElement.querySelector('.big-picture__img img');
    var likes = bigPictureElement.querySelector('.likes-count');
    clearComments();
    window.commentsMore.showButtonMore();
    image.src = data[index].url;
    likes.textContent = data[index].likes;
    window.commentsMore.upgradeCountIfFewPhotos(data, index);
    addComments(data[index].comments);
    setDescription(data[index].description);
  };

  window.fullScreenPhoto = {
    addInformation: addInformation,
    open: openBigPicture,
  };
})();
