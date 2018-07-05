'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;
  var HASHTAG = {
    code: '#',
    maxCount: 5,
    maxChars: 20
  };

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('.img-upload__input');
  var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  var uploadClose = uploadForm.querySelector('#upload-cancel');
  var buttonMinus = uploadForm.querySelector('.resize__control--minus');
  var buttonPlus = uploadForm.querySelector('.resize__control--plus');
  var scaleValue = uploadForm.querySelector('.resize__control--value').value;
  var imageUpload = uploadForm.querySelector('.img-upload__preview');
  var imagePreview = uploadForm.querySelector('.img-upload__preview > img');
  var positionPinValue = uploadForm.querySelector('.scale__value').value;
  var radioButtons = uploadForm.querySelectorAll('.effects__radio');
  var imgUploadScale = uploadForm.querySelector('.img-upload__scale');
  var textDescription = uploadForm.querySelector('.text__description');
  var hashtagsContainer = uploadForm.querySelector('.text__hashtags');
  var scaleValueNumber = parseInt(scaleValue, 10);
  var currentEffect = 'none';

  uploadFile.addEventListener('change', function (evt) {
    evt.stopPropagation();
    uploadOverlay.classList.remove('hidden');
    imgUploadScale.classList.add('hidden');
  });

  var closeForm = function () {
    uploadOverlay.classList.add('hidden');
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== hashtagsContainer && document.activeElement !== textDescription) { // в файле валидации window.hashtagsContainer - без виндо, как от виндоу избавиться?
      closeForm();
    }
  });

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

  var setEffect = function (sliderValue) {
    var result;
    switch (currentEffect) {
      case 'chrome':
        result = 'grayscale(' + (sliderValue / 100) + ')';
        break;
      case 'sepia':
        result = 'sepia(' + (sliderValue / 100) + ')';
        break;
      case 'marvin':
        result = 'invert(' + sliderValue + '%)';
        break;
      case 'phobos':
        result = 'blur(' + (sliderValue * 3 / 100) + 'px)';
        break;
      case 'heat':
        result = 'brightness(' + ((sliderValue * 2 / 100) + 1) + ')';
        break;
      default: result = 'none';
        break;
    }
    imagePreview.style.filter = result;
  };

  Array.prototype.forEach.call(radioButtons, function (element, j) {
    radioButtons[j].addEventListener('click', function (evt) {

      var target = evt.target.closest('.img-upload__effects');

      if (target) {
        imagePreview.className = 'effects__preview--' + evt.target.value;
        if (evt.target.value !== 'none') {
          imgUploadScale.classList.remove('hidden');
        } else {
          imgUploadScale.classList.add('hidden');
        }
        currentEffect = evt.target.value;
        window.slider.setDefaultPosition();
        setEffect(positionPinValue);
      }
    });
  });

  var resetImgForm = function () {
    printSize(100);
    imagePreview.setAttribute('class', '');
    imagePreview.style.filter = 'none';
  };

  uploadClose.addEventListener('click', function () {
    closeForm();
    resetImgForm();
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (!window.bigPicture.element.classList.contains('hidden')) {
        window.bigPicture.close();
      }
      if (!uploadForm.classList.contains('hidden')) {
        resetImgForm();
      }
    }
  });

  hashtagsContainer.addEventListener('input', function () {
    hashtagsContainer.setCustomValidity('');
    var textHashtags = hashtagsContainer.value.toLowerCase().trim();
    if (textHashtags === '') {
      return;
    }

    var hashtags = textHashtags.split(' ');
    var sameValue = window.util.shuffleArray(hashtags);

    if (sameValue) {
      hashtagsContainer.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    }
    if (hashtags.length > HASHTAG.maxCount) {
      hashtagsContainer.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== HASHTAG.code) {
        hashtagsContainer.setCustomValidity('Хэш-тег начинается с символа #');
      }
      if (hashtags[i] === HASHTAG.code) {
        hashtagsContainer.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      }
      if (hashtags[i].length > HASHTAG.maxChars) {
        hashtagsContainer.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
      }
    }
  });

  uploadForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(uploadForm), function () {
      closeForm();
      resetImgForm();
      uploadForm.reset();
    });
    evt.preventDefault();
  });

  window.form = {
    mapPinValue: positionPinValue,
    drawEffect: setEffect,
    resetImgForm: resetImgForm
  };
})();
