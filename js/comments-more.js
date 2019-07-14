'use strict';
(function () {
  var SHOW_FIRST_COMMENTS = 5;
  var SHOW_NEXT_COMMENTS = 5;
  var NEXT_COMMENT = 1;

  var bigPictureElement = document.querySelector('.big-picture');
  var buttonMoreComment = document.querySelector('.social__comments-loader');
  var commentsCount = bigPictureElement.querySelector('.comments-count');
  var hideButtonMoreComment = function () {
    buttonMoreComment.classList.add('hidden');
  };
  var showButtonMore = function () {
    buttonMoreComment.classList.remove('hidden');
  };

  var hideComments = function () {
    var comments = document.querySelectorAll('.social__comment');
    for (var i = SHOW_FIRST_COMMENTS; i < comments.length; i++) {
      var comment = comments[i];
      comment.classList.add('visually-hidden');
    }
  };

  var showNextComments = function () {
    var commentsHidden = document.querySelectorAll('.social__comment.visually-hidden');

    for (var i = 0; i < SHOW_NEXT_COMMENTS; i++) {
      var commentHidden = commentsHidden[i];
      if (!commentHidden) {
        hideButtonMoreComment();
        break;
      } else if (!commentsHidden[i + NEXT_COMMENT]) {
        hideButtonMoreComment();
      }
      commentHidden.classList.remove('visually-hidden');
    }
  };

  var upgradeCountIfFewPhotos = function (data, index) {
    if (data[index].comments.length <= SHOW_FIRST_COMMENTS) {
      commentsCount.previousSibling.textContent = data[index].comments.length + ' из ';
      hideButtonMoreComment();
    } else {
      commentsCount.previousSibling.textContent = SHOW_FIRST_COMMENTS + ' из ';
    }
    commentsCount.textContent = data[index].comments.length;
  };

  var setCommentsCount = function () {
    var commentsShow = document.querySelectorAll('.social__comments > :not(.visually-hidden)');
    commentsCount.previousSibling.textContent = commentsShow.length + ' из ';
  };

  window.commentsMore = {
    hidden: hideComments,
    show: showNextComments,
    upgradeCountIfFewPhotos: upgradeCountIfFewPhotos,
    showButtonMore: showButtonMore,
    setCommentsCount: setCommentsCount,
  };
})();
