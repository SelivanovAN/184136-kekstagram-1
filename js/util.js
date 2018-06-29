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
    // printSize: function (size) {
    //   var uploadForm = document.querySelector('.img-upload__form');
    //   var imageUpload = uploadForm.querySelector('.img-upload__preview');
    //   uploadForm.querySelector('.resize__control--value').value = size + '%';
    //   imageUpload.style.transform = 'scale(' + size / 100 + ')';
    // },
    // resetImgForm: function () {
    //   var uploadForm = document.querySelector('.img-upload__form');
    //   var imagePreview = uploadForm.querySelector('.img-upload__preview > img');
    //   window.util.printSize(100);
    //   imagePreview.setAttribute('class', '');
    //   imagePreview.style.filter = 'none';
    // }
  };
})();
