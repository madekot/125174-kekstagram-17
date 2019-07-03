'use strict';
(function () {
  var RANDOM_CARD_COUNT = 10;

  var menu = document.querySelector('.img-filters');
  menu.classList.remove('img-filters--inactive');

  var removePhotoCards = function () {
    var photoCards = document.querySelectorAll('.picture');
    for (var i = 0; i < photoCards.length; i++) {
      var photoCard = photoCards[i];
      photoCard.parentElement.removeChild(photoCard);
    }
  };

  var popularFilter = menu.querySelector('#filter-popular');
  popularFilter.addEventListener('click', function () {
    window.throttle(function () {
      removePhotoCards();
      window.picture.render(window.backend.data());
    });
  });

  var getRandomCards = function () {
    var cloneDataCards = window.backend.data().slice();
    return window.utility.random.shuffleArray(cloneDataCards).slice(0, RANDOM_CARD_COUNT);
  };

  var newFilter = menu.querySelector('#filter-new');
  newFilter.addEventListener('click', function () {
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

  var discussedFilter = menu.querySelector('#filter-discussed');
  discussedFilter.addEventListener('click', function () {
    window.throttle(function () {
      removePhotoCards();
      window.picture.render(getDebateCards());
    });
  });

})();
