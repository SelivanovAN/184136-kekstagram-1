'use strict';

(function () {
  var galleryElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;

  // --------- Заполняем данными сгенерированные карточки (функция создания DOM-элемента на основе JS-объекта )---------

  var renderPhoto = function (photo) {
    // функция клонирования одного ДОМ элемента
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    return photoElement;
  };

  var addPhotoToFragment = function () {
    var fragment = document.createDocumentFragment();
    // --------- функция заполнения контейнера DOM-элементами на основе массива из 25 шт---------
    for (var i = 0; i < window.dataPhotoArr.length; i++) {
      fragment.appendChild(renderPhoto(window.dataPhotoArr[i]));
    }
    galleryElement.appendChild(fragment);
  };

  addPhotoToFragment();

  window.galleryElement = galleryElement;
})();
