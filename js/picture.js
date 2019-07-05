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
    commentElement.textContent = coment.comments.length;
    return photoElement;
  };

  var simulationPictureElement = document.querySelector('.pictures');

  var renderPhotosElements = function (dataArr) {
    var fragment = document.createDocumentFragment();
    dataArr.forEach(function (photo) {
      var photoElement = createPhotoElement(photo);
      fragment.appendChild(photoElement);
    });
    simulationPictureElement.appendChild(fragment);
    window.fullScreenPhoto.addEventListenerPictures(dataArr);
  };

  window.picture = {
    render: renderPhotosElements,
  };

})();
