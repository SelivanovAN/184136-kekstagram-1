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

    galleryElement.addEventListener('click', function (evt) { // событие по клику на маленькую фотку для отображения большой
      var targetElement = evt.target.closest('.picture__link'); // возвращает клик если он произошел на элекменте с классом picture__link
      if (targetElement) { // если событие было на теге с классом picture__link
        var imageElement = targetElement.querySelector('img'); // у елемента, на котором произошло событие выбирает элемент с тегом IMG

        if (imageElement) { // если событие было на теге с классом picture__link
          if (pictureElements.length === 0) { // НЕПОНЯЛ КАК ИТЕРПРИТИРОВАТЬ - сравнение цифру длину массива
            pictureElements = galleryElement.querySelectorAll('.picture__img'); // НЕПОНЯЛ КАК ИТЕРПРИТИРОВАТЬ = присваиваем или выбираем из массива элементы с классом picture__img
          }
          var index = Array.from(pictureElements).indexOf(imageElement); // Метод Array.from() создаёт новый экземпляр Array из массивоподобного или итерируемого объекта
          // Метод indexOf() возвращает первый индекс, по которому данный элемент может быть найден в массиве или -1, если такого индекса нет.
          window.bigPicture.render(photos[index]); // НЕПОНЯЛ КАК ИТЕРПРИТИРОВАТЬ отрисовываем картинку и ее атрибуты, в зависимости от того на какой картинке было событие (отрисовываем саму картинку, лайка, описание)
          window.bigPicture.element.classList.remove('hidden'); // удаляем класс у большой картинки и отображаем маленькую в полноэкранном виде
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
    },
    remove: removePhotos
  };
})();
