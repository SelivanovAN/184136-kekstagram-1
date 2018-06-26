'use strict';

window.util = (function () {
  return {
    getRandomNumber: function (min, max) { // --------- функция генерации случайных чисел---------
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
