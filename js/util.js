'use strict';

(function () {
  window.util = {
    getRandomNumber: function (min, max) { // --------- функция генерации случайных чисел---------
      return Math.floor(Math.random() * (max - min)) + min;
    }
    // closeForm: function () {
    //   var uploadOverlay = document.querySelector('.img-upload__overlay');
    //   uploadOverlay.classList.add('hidden');
    // }
  };
})();
