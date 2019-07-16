'use strict';
(function () {
  var SHOW_FIRST_COMMENTS = 5;
  var SHOW_NEXT_COMMENTS = 5;
  var NEXT_COMMENT = 1;

  var bigPictureElement = document.querySelector('.big-picture');
  var buttonMoreCommentElement = document.querySelector('.social__comments-loader');
  var commentsCountElement = bigPictureElement.querySelector('.comments-count');
  var hideButtonMoreComment = function () {
    buttonMoreCommentElement.classList.add('hidden');
  };
  var showButtonMore = function () {
    buttonMoreCommentElement.classList.remove('hidden');
  };

  var hideComments = function () {
    var commentsElements = document.querySelectorAll('.social__comment');
    for (var i = SHOW_FIRST_COMMENTS; i < commentsElements.length; i++) {
      var commentElement = commentsElements[i];
      commentElement.classList.add('visually-hidden');
    }
  };

  var showNextComments = function () {
    var commentsHiddenElements = document.querySelectorAll('.social__comment.visually-hidden');

    for (var i = 0; i < SHOW_NEXT_COMMENTS; i++) {
      var commentHiddenElement = commentsHiddenElements[i];
      if (!commentHiddenElement) {
        hideButtonMoreComment();
        break;
      } else if (!commentsHiddenElements[i + NEXT_COMMENT]) {
        hideButtonMoreComment();
      }
      commentHiddenElement.classList.remove('visually-hidden');
    }
  };

  var upgradeCountIfFewPhotos = function (data, index) {
    if (data[index].comments.length <= SHOW_FIRST_COMMENTS) {
      commentsCountElement.previousSibling.textContent = data[index].comments.length + ' из ';
      hideButtonMoreComment();
    } else {
      commentsCountElement.previousSibling.textContent = SHOW_FIRST_COMMENTS + ' из ';
    }
    commentsCountElement.textContent = data[index].comments.length;
  };

  var setCommentsCount = function () {
    var commentsShowElements = document.querySelectorAll('.social__comments > :not(.visually-hidden)');
    commentsCountElement.previousSibling.textContent = commentsShowElements.length + ' из ';
  };

  window.commentsMore = {
    hidden: hideComments,
    show: showNextComments,
    upgradeCountIfFewPhotos: upgradeCountIfFewPhotos,
    showButtonMore: showButtonMore,
    setCommentsCount: setCommentsCount,
  };
})();
