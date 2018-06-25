'use strict';

(function () {

// --------- Module4-task1 Загрузка изображения и показ фото в полноэкранном режиме ---------

  var ESC_KEYCODE = 27;
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('.img-upload__input');
  var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  var uploadClose = uploadForm.querySelector('#upload-cancel');
  var buttonMinus = uploadForm.querySelector('.resize__control--minus');
  var buttonPlus = uploadForm.querySelector('.resize__control--plus');
  var scaleValue = uploadForm.querySelector('.resize__control--value').value;
  var scaleValueNumber = parseInt(scaleValue, 10);
  var imageUpload = uploadForm.querySelector('.img-upload__preview');
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;
  var imagePreview = uploadForm.querySelector('.img-upload__preview > img');
  var pictureElements = [];
  var currentEffect = 'none';
  window.positionPin = uploadForm.querySelector('.scale__value').value;

  // --------- Открываем форму для редактирования ---------

  uploadFile.addEventListener('change', function (evt) {
    evt.stopPropagation(); //  отменяет всплыв события
    uploadOverlay.classList.remove('hidden');
  });

  // ----------- Закрываем форму редактирования ----------

  var closeForm = function () {
    uploadOverlay.classList.add('hidden');
  };

  var textDescription = document.querySelector('.text__description');

  var hashtagsContainer = document.querySelector('.text__hashtags'); // double picture and validation

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== hashtagsContainer && document.activeElement !== textDescription) { // в файле валидации window.hashtagsContainer - без виндо, как от виндоу избавиться?
      closeForm();
    }
  });

  // ----------- Маштабирование ----------

  var printSize = function (size) {
    uploadForm.querySelector('.resize__control--value').value = size + '%';
    imageUpload.style.transform = 'scale(' + size / 100 + ')';
  };

  buttonMinus.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (scaleValueNumber > MIN_SCALE && scaleValueNumber <= MAX_SCALE) {
      scaleValueNumber = scaleValueNumber - STEP_SCALE;
      printSize(scaleValueNumber);
    }
  });

  buttonPlus.addEventListener('click', function () {
    if (scaleValueNumber >= MIN_SCALE && scaleValueNumber < MAX_SCALE) {
      scaleValueNumber = scaleValueNumber + STEP_SCALE;
      printSize(scaleValueNumber);
    }
  });

  // ----------- Применяем эффекты ----------

  window.setEffect = function () {
    var result;
    switch (currentEffect) {
      case 'chrome':
        result = 'grayscale(' + (window.positionPin / 100) + ')';
        break;
      case 'sepia':
        result = 'sepia(' + (window.positionPin / 100) + ')';
        break;
      case 'marvin':
        result = 'invert(' + window.positionPin + '%)';
        break;
      case 'phobos':
        result = 'blur(' + (window.positionPin * 3 / 100) + 'px)';
        break;
      case 'heat':
        result = 'brightness(' + ((window.positionPin * 2 / 100) + 1) + ')';
        break;
      default: result = 'none';
        break;
    }
    imagePreview.style.filter = result;
  };

  var radioButtons = uploadForm.querySelectorAll('.effects__radio');
  for (var j = 0; j < radioButtons.length; j++) {
    radioButtons[j].addEventListener('click', function (evt) {
      var target = evt.target.closest('.img-upload__effects');

      if (target) {
        imagePreview.className = 'effects__preview--' + evt.target.value;
        currentEffect = evt.target.value;
        window.setEffect();
      }
    });
  }

  // ----------- Показываем фотографии в полноэкранном формате при нажатии на маленькое----------

  window.gallery.addEventListener('click', function (evt) {
    var targetElement = evt.target.closest('.picture__link');
    if (targetElement) {
      var imageElement = targetElement.querySelector('img');

      if (imageElement) {
        if (pictureElements.length === 0) {
          pictureElements = window.gallery.querySelectorAll('.picture__img');
        }
        var index = Array.from(pictureElements).indexOf(imageElement);
        window.renderBigPicture(window.photos[index]);
        window.bigPicture.classList.remove('hidden');
      }
    }
  });

  // ----------- Закрываем окно bigPicture ----------

  var btnCloseBigPicture = window.bigPicture.querySelector('.big-picture__cancel');

  var resetImgForm = function () {
    printSize(100);
    imagePreview.setAttribute('class', '');
    imagePreview.style.filter = 'none';
  };

  var closeBigPicture = function () {
    window.bigPicture.classList.add('hidden');
    resetImgForm();
  };

  btnCloseBigPicture.addEventListener('click', closeBigPicture);

  uploadClose.addEventListener('click', function () {
    closeForm();
    resetImgForm();
  });

  window.addEventListener('keydown', function (evt) { // закрываем и большую картинку и форму
    if (evt.keyCode === ESC_KEYCODE) {
      if (!window.bigPicture.classList.contains('hidden')) {
        closeBigPicture();
      }
      if (!uploadForm.classList.contains('hidden')) {
        resetImgForm();
      }
    }
  });
})();
