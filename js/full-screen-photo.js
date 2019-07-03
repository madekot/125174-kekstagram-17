'use strict';
(function () {
  var AVATAR_MIN_NUMBER = 1;
  var AVATAR_MAX_NUMBER = 6;
  var FIRST_COMMENT_DATA = 0;

  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  var addComment = function (textContent) {
    var templateElement = document.querySelector('#social__comment').content.querySelector('.social__comment');
    var liElement = templateElement.cloneNode(true);
    var imageElement = liElement.querySelector('.social__picture');
    imageElement.src = 'img/avatar-' + window.utility.random.number(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER) + '.svg';
    var paragraphElement = liElement.querySelector('.social__text');
    paragraphElement.textContent = textContent;
    return liElement;
  };

  var listComents = document.querySelector('.social__comments');
  var clearComments = function () {
    listComents.innerHTML = '';
  };
  clearComments();

  var hideCountCommentsAndNewComments = function () {
    var countComments = bigPicture.querySelector('.social__comment-count');
    countComments.classList.add('visually-hidden');

    var newComments = bigPicture.querySelector('.comments-loader');
    newComments.classList.add('visually-hidden');
  };
  hideCountCommentsAndNewComments();

  var addComents = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data[FIRST_COMMENT_DATA].comments.length; i++) {
      var textComment = data[FIRST_COMMENT_DATA].comments[i].message;
      var comment = addComment(textComment);
      fragment.appendChild(comment);
    }
    listComents.appendChild(fragment);
  };

  var setDescription = function (data) {
    var textContent = data[FIRST_COMMENT_DATA].description;
    var description = bigPicture.querySelector('.social__caption');
    description.textContent = textContent;
  };

  var addInformationPhoto = function (data) {
    var image = bigPicture.querySelector('.big-picture__img img');
    image.src = data[0].url;
    var likes = bigPicture.querySelector('.likes-count');
    likes.textContent = data[FIRST_COMMENT_DATA].likes;
    var commentsCount = bigPicture.querySelector('.comments-count');
    commentsCount.textContent = data[FIRST_COMMENT_DATA].comments.length;
    addComents(data);
    setDescription(data);
  };

  window.fullScreenPhoto = {
    addInformationPhoto: addInformationPhoto,
  };
})();
