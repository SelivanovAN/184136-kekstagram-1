'use strict';

(function () {
  var MIN_NUMBER_COMMENTS = 1; // обхявляем перменную по мин комментам
  var MAX_NUMBER_COMMENTS = 6; // объявляем переменную по мах комментам

  var bigPictureElement = document.querySelector('.big-picture'); // объявляем переменную выбирая тег в который будем класть фотку и смотреть ее в полноэкранном режиме

  var renderBigPicture = function (photo) { // объявляем фунцию которая добавляем теги в большую картинку - по факту мы предоставляем адрес картинки и описание к ней
    bigPictureElement.querySelector('.big-picture__img img').src = photo.url; // добавляем (присваиваем) большой картинке тег ИМГ с адресом картинки
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes; // добавляем большой картинке тег P - количество лайков
    bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length; // добавляем большой картинке тег СПАН с количество комментариев
    bigPictureElement.querySelector('.social__caption').textContent = photo.description; // добавляем большой картинке тег Р - описание

    var socialComments = bigPictureElement.querySelector('.social__comments'); // выбираем тег списка комментарии у болшой картинки
    socialComments.innerHTML = ''; // очищаем список комментариев у большой картинки

    var fragmentBigPicture = document.createDocumentFragment(); // создаем контейнр в которым поместим большие картинки
    var MAX_COMMENTS = 5; // объявляем переменную для максимального количества комментариев
    var COUNT_COMMENTS = photo.comments.length > MAX_COMMENTS ? MAX_COMMENTS : photo.comments.length; // объявляем переменную, которая говорит, если у большой фотки больше 5 комментов то покажи первые 5 комментов

    for (var l = 0; l < COUNT_COMMENTS; l++) { // создаем цикл, который создает у большой фотки теги Li (25 шт) - 5 - и добавляет ему класс
      var listElement = document.createElement('li'); // создает тег Li
      listElement.classList.add('social__comment'); // добавляет тегу Li класс

      var commentImage = document.createElement('img'); // создаем тег IMG (автарку для описания большой картинки)
      commentImage.src = 'img/avatar-' + window.util.getRandomNumber(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS) + '.svg'; // созданнному тегу IMG добавляем адрес картинки
      commentImage.classList.add('social__picture'); // созданному тегу IMG добавляем класс
      commentImage.width = 35; // созданному тегу IMG указваем ширину
      commentImage.height = 35; // созданному тегу IMG указываем высоту
      listElement.appendChild(commentImage); // добавляем (вкладываем) тегам комментариев большой картинки - данные о комментарии: картинку, адрес, ширину, высоту и адрес

      var textElement = document.createElement('p'); // создаем у комментариев большой картинки тег P
      textElement.textContent = photo.comments[l]; // в тег P добавляем содержание комментария
      textElement.classList.add('social__text'); // добавляем тегу P класс
      listElement.appendChild(textElement); // добавляем тег P в тег Li

      fragmentBigPicture.appendChild(listElement); // добавляем все комментарии для большой картинки в контейнер
    }
    socialComments.appendChild(fragmentBigPicture); // вытаскиваем и з контейнера все комменты для большой картинки и добавляем их в разметку большой картинки
  };

  // var socialCommentCount = document.querySelector('.social__comment-count');
  // var socialCommentLoad = document.querySelector('.social__loadmore');

  // socialCommentCount.classList.add('visually-hidden');
  // socialCommentLoad.classList.add('visually-hidden');

  window.bigPicture = {
    element: bigPictureElement, // экспортируем контейнер с комментариями
    render: renderBigPicture // экспортируем функцию отрисовки большой картинки
  };

})();
