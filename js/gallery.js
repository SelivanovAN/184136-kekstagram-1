'use strict';

(function () {
  window.gallery = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;

  // --------- Заполняем данными сгенерированные карточки (функция создания DOM-элемента на основе JS-объекта )---------

  var renderPhoto = function (photo) {
    // функция создания DOM-элемента на основе JS-объекта
    // функция заполнения блока DOM-элементами на основе массива JS-объектов
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    return photoElement;
  };

  var addPhotoToFragment = function () {
    var fragment = document.createDocumentFragment();
    // --------- функция заполнения блока DOM-элементами на основе массива ---------
    for (var i = 0; i < window.photos.length; i++) {
      fragment.appendChild(renderPhoto(window.photos[i]));
    }
    window.gallery.appendChild(fragment);
  };

  addPhotoToFragment();
})();
