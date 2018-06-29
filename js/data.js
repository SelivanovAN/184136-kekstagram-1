'use strict';

(function () {
  // var COUNT_PHOTOS = 25;
  // var MIN_LIKES = 15;
  // var MAX_LIKES = 200;
  // var PHOTO_COMMENTS = [
  //   'Всё отлично',
  //   'В целом всё неплохо. Но не всё.',
  //   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  //   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  //   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  //   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  // ];
  // var PHOTO_DESCRIPTIONS = [
  //   'Тестим новую камеру!',
  //   'Затусили с друзьями на море',
  //   'Как же круто тут кормят',
  //   'Отдыхаем...',
  //   'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  //   'Вот это тачка!'
  // ];
  //
  // // --------- фукнция перемешивания массива ---------
  // var shuffleComments = function (array) {
  //   var j;
  //   var temp;
  //   var i;
  //   for (i = array.length - 1; i > 0; i--) {
  //     j = Math.floor(Math.random() * (i + 1));
  //     temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }
  //   return array;
  // };
  //
  // // --------- Генерируется массив фоток количеством 25 шт из цикла (функция генерации случайных данных) ---------
  //
  // var photos = [];
  //
  // var appendPhotos = function () {
  //   for (var j = 0; j < COUNT_PHOTOS; j++) {
  //     photos.push({
  //       url: 'photos/' + (j + 1) + '.jpg',
  //       likes: window.util.getRandomNumber(MIN_LIKES, MAX_LIKES),
  //       comments: shuffleComments(PHOTO_COMMENTS).slice(0, window.util.getRandomNumber(0, PHOTO_COMMENTS.length - 1)),
  //       description: PHOTO_DESCRIPTIONS[window.util.getRandomNumber(0, PHOTO_DESCRIPTIONS.length - 1)]
  //     });
  //   }
  // };
  //
  // appendPhotos();
  //
  // window.dataPhotoArr = photos;
})();
