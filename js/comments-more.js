'use strict';
(function () {
  var SHOW_FIRST_COMMENTS = 5;
  var SHOW_NEXT_COMMENTS = 5;

  var buttonMoreComment = document.querySelector('.social__comments-loader');

  var hiddenComments = function () {
    var comments = document.querySelectorAll('.social__comment');
    for (var i = SHOW_FIRST_COMMENTS; i < comments.length; i++) {
      var comment = comments[i];
      comment.classList.add('visually-hidden');
    }
  };

  var showNextComment = function () {
    var commentsHidden = document.querySelectorAll('.social__comment.visually-hidden');
    for (var i = 0; i < SHOW_NEXT_COMMENTS; i++) {
      var commentHidden = commentsHidden[i];
      if (!commentHidden) {
        buttonMoreComment.classList.add('hidden');
        break;
      } else {
        commentHidden.classList.remove('visually-hidden');
      }
    }
  };

  window.commentsMore = {
    hidden: hiddenComments,
    show: showNextComment,
  };

})();
