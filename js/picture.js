'use strict';
(function () {
  var templatePictureElement = document.querySelector('#picture').content.querySelector('.picture');

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

  var simulationPictureElement = document.querySelector('.pictures');
  renderPhotosElements(simulationPictureElement, window.data);
})();
