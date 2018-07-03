'use strict';

(function () {
  var COUNT_PHOTOS = 25;
  var galleryElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;
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


  var appendPhotos = function (data) {
    // galleryElement.innerHTML = '';

    for (var i = 0; i < COUNT_PHOTOS; i++) {
      fragment.appendChild(renderPhoto(data[i]));
    }

    galleryElement.appendChild(fragment);
  };

  var onSuccessed = function (response) {
    photos = response.slice();

    window.updatePhotos(photos);

    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');

    window.filters.active.classList.remove('img-filters__button--active');
  };

  var onErrored = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error__donlowd');
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccessed, onErrored);

  window.gallery = {
    element: galleryElement,
    photos: function () {
      return photos;
    }
  };

  window.photos = {
    render: appendPhotos,
    data: function () {
      return photos;
    }
  };
})();
