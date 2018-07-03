'use strict';

(function () {
  var COUNT_PHOTOS = 25;
  var galleryElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;
  var pictureElements = [];
  var photos = [];
  var fragment = document.createDocumentFragment();

  // --------- Заполняем данными сгенерированные карточки (функция создания DOM-элемента на основе JS-объекта )---------

  var renderPhoto = function (photo) {
    // функция клонирования одного ДОМ элемента
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

    for (var i = 0; i < COUNT_PHOTOS; i++) {
      fragment.appendChild(renderPhoto(data[i]));
    }

    galleryElement.appendChild(fragment);

    galleryElement.addEventListener('click', function (evt) {
      var targetElement = evt.target.closest('.picture__link');
      if (targetElement) {
        var imageElement = targetElement.querySelector('img');

        if (imageElement) {
          if (pictureElements.length === 0) {
            pictureElements = galleryElement.querySelectorAll('.picture__img');
          }
          var index = Array.from(pictureElements).indexOf(imageElement);
          window.bigPicture.render(photos[index]);
          window.bigPicture.element.classList.remove('hidden');
        }
      }
    });
  };

  var onSuccessed = function (response) {
    photos = response.slice();

    window.updatePhotos(photos);

    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
  };

  var onErrored = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error__donlowd');
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccessed, onErrored);

  window.photos = {
    render: appendPhotos,
    data: function () {
      return photos;
    }
  };
})();
