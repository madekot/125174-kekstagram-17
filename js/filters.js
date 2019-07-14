'use strict';
(function () {
  var RANDOM_CARD_COUNT = 10;

  var menuElement = document.querySelector('.img-filters');
  var showFiltersMenu = function () {
    menuElement.classList.remove('img-filters--inactive');
  };

  var removePhotoCards = function () {
    var photoCardsElements = document.querySelectorAll('.picture');
    for (var i = 0; i < photoCardsElements.length; i++) {
      var photoCardElement = photoCardsElements[i];
      photoCardElement.parentElement.removeChild(photoCardElement);
    }
  };

  var popularFilterElement = menuElement.querySelector('#filter-popular');
  popularFilterElement.addEventListener('click', function () {
    window.throttle(function () {
      removePhotoCards();
      window.picture.render(window.backend.data());
    });
  });

  var getRandomCards = function () {
    var cloneDataCards = window.backend.data().slice();
    return window.utility.random.shuffleArray(cloneDataCards).slice(0, RANDOM_CARD_COUNT);
  };

  var newFilterElement = menuElement.querySelector('#filter-new');
  newFilterElement.addEventListener('click', function () {
    window.throttle(function () {
      removePhotoCards();
      window.picture.render(getRandomCards());
    });
  });

  var getDebateCards = function () {
    var cloneDataCards = window.backend.data().slice();
    cloneDataCards.sort(function (a, b) {
      return a.comments.length < b.comments.length ? 1 : -1;
    });
    return cloneDataCards;
  };

  var discussedFilterElement = menuElement.querySelector('#filter-discussed');
  discussedFilterElement.addEventListener('click', function () {
    window.throttle(function () {
      removePhotoCards();
      window.picture.render(getDebateCards());
    });
  });

  window.filters = {
    show: showFiltersMenu
  };

})();
