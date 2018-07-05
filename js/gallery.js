'use strict';

(function () {
  var galleryElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;
  var fragment = document.createDocumentFragment();
  var imgUploadMessageError = pictureTemplate.querySelector('.img-upload__message--error');
  var pictureElements = [];
  var photos = [];

  var renderPhoto = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    return photoElement;
  };

  var removePhotos = function () {
    var collectionPhotos = galleryElement.querySelectorAll('.picture__link');
    if (collectionPhotos) {
      [].forEach.call(collectionPhotos, function (element) {
        galleryElement.removeChild(element);
      });
    }
  };

  var appendPhotos = function (data) {
    removePhotos();

    for (var i = 0; i < window.filter.photos().length; i++) {
      fragment.appendChild(renderPhoto(data[i]));
    }

    galleryElement.appendChild(fragment);
  };

  galleryElement.addEventListener('click', function (evt) {
    var targetElement = evt.target.closest('.picture__link');

    if (targetElement) {
      var imageElement = targetElement.querySelector('img');

      if (imageElement) {
        pictureElements = galleryElement.querySelectorAll('.picture__img');

        var index = Array.from(pictureElements).indexOf(imageElement);

        window.bigPicture.render(window.filter.photos()[index]);
        window.bigPicture.element.classList.remove('hidden');
      }
    }
  });

  var onSuccessed = function (response) {
    photos = response.slice();
    window.filter.updatePhotos();

    var imgFilters = document.querySelector('.img-filters');

    imgFilters.classList.remove('img-filters--inactive');
  };

  var onErrored = function () {
    var errorElement = imgUploadMessageError.cloneNode(true);

    document.body.insertAdjacentElement('beforeend', errorElement);
    errorElement.classList.remove('hidden');
    errorElement.style.zIndex = '2';
  };

  window.backend.load(onSuccessed, onErrored);

  window.gallery = {
    render: appendPhotos,
    data: function () {
      return photos;
    }
  };
})();
