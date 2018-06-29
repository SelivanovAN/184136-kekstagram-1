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

  // var addPhotoToFragment = function () {
  //   var fragment = document.createDocumentFragment();
  //   // --------- функция заполнения контейнера DOM-элементами на основе массива из 25 шт---------
  //   for (var i = 0; i < window.dataPhotoArr.length; i++) {
  //     fragment.appendChild(renderPhoto(window.dataPhotoArr[i]));
  //   }
  //   galleryElement.appendChild(fragment);
  // };

  // addPhotoToFragment();

  var onSuccessed = function (photos) {
    var COUNT_PHOTOS = 25;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < COUNT_PHOTOS; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }

    galleryElement.appendChild(fragment);
  };

  var onErrored = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 5; margin: 0 auto; background-color: red; border-radius: 15px;';
    node.style.position = 'absolute';
    node.style.display = 'flex';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '25%';
    node.style.alignItems = 'center';
    node.style.justifyContent = 'center';
    node.style.width = '50%';
    node.style.height = '100px';
    node.style.fontSize = '24px';
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  var form = document.querySelector('.img-upload__form');

  form.addEventListener('submit', function (evt) { // нажимаем на кнопку "опубликовать и закрываем форму обнулив все данные"
    window.backend.save(new FormData(form), function () {
      window.util.closeForm();
      // window.util.resetImgForm();
    });
    evt.preventDefault();
  });

  window.backend.load(onSuccessed, onErrored);

  window.galleryElement = galleryElement;
})();
