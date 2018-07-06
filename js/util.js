'use strict';

(function () {
  window.util = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    shuffleArray: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        var arrayValue = arr[i];
        for (var l = 0; l < arr.length; l++) {
          if (arr[l] === arrayValue && l !== i) {
            return true;
          }
        }
      }
      return false;
    }
  };
})();
