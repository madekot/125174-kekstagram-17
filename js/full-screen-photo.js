'use strict';
(function () {
  var AVATAR_MIN_NUMBER = 1;
  var AVATAR_MAX_NUMBER = 6;
  var listComents = document.querySelector('.social__comments');

  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  var clearComments = function () {
    listComents.innerHTML = '';
  };

  var hideCountCommentsAndNewComments = function () {
    var countComments = bigPicture.querySelector('.social__comment-count');
    var newComments = bigPicture.querySelector('.comments-loader');
    countComments.classList.add('visually-hidden');
    newComments.classList.add('visually-hidden');
  };

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
    listComents.appendChild(fragment);
  };

  var setDescription = function (descriptionText) {
    var description = bigPicture.querySelector('.social__caption');
    description.textContent = descriptionText;
  };

  var addInformationPhoto = function (data) {
    var image = bigPicture.querySelector('.big-picture__img img');
    var likes = bigPicture.querySelector('.likes-count');
    var commentsCount = bigPicture.querySelector('.comments-count');
    clearComments();
    hideCountCommentsAndNewComments();
    image.src = data[0].url;
    likes.textContent = data[0].likes;
    commentsCount.textContent = data[0].comments.length;
    addComments(data[0].comments);
    setDescription(data[0].description);
  };

  window.fullScreenPhoto = {
    addInformationPhoto: addInformationPhoto,
  };
})();
