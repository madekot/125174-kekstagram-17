'use strict';
(function () {
  var RANDOM_CARD_COUNT = 10;

  var originalDataCards = [];

  var onLoad = function (data) {
    originalDataCards = data;
    window.picture.render(data);
  };

  window.backend.load(onLoad);

  var menu = document.querySelector('.img-filters');
  menu.classList.remove('img-filters--inactive');

  var popularFilter = menu.querySelector('#filter-popular');

  var removePhotoCards = function () {
    var photoCards = document.querySelectorAll('.picture');
    for (var i = 0; i < photoCards.length; i++) {
      var photoCard = photoCards[i];
      photoCard.parentElement.removeChild(photoCard);
    }
  };

  popularFilter.addEventListener('click', function () {
    window.debounce(function () {
      removePhotoCards();
      window.picture.render(originalDataCards);
    });
  });

  var getRandomCards = function () {
    var cloneDataCards = originalDataCards.slice();
    return window.utility.random.shuffleArray(cloneDataCards).slice(0, RANDOM_CARD_COUNT);
  };

  var newFilter = menu.querySelector('#filter-new');
  newFilter.addEventListener('click', function () {
    window.debounce(function () {
      removePhotoCards();
      window.picture.render(getRandomCards());
    });
  });

  var getDebateCards = function () {
    var cloneDataCards = originalDataCards.slice();
    cloneDataCards.sort(function (a, b) {
      return a.comments.length < b.comments.length ? 1 : -1;
    });
    return cloneDataCards;
  };

  var discussedFilter = menu.querySelector('#filter-discussed');
  discussedFilter.addEventListener('click', function () {
    window.debounce(function () {
      removePhotoCards();
      window.picture.render(getDebateCards());
    });
  });

})();
