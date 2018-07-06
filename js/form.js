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

  var uploadFormElement = document.querySelector('.img-upload__form');
  var uploadFileElement = uploadFormElement.querySelector('.img-upload__input');
  var uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
  var uploadCloseElement = uploadFormElement.querySelector('#upload-cancel');
  var buttonMinusElement = uploadFormElement.querySelector('.resize__control--minus');
  var buttonPlusElement = uploadFormElement.querySelector('.resize__control--plus');
  var scaleValueElement = uploadFormElement.querySelector('.resize__control--value').value;
  var imageUploadElement = uploadFormElement.querySelector('.img-upload__preview');
  var imagePreviewElement = uploadFormElement.querySelector('.img-upload__preview > img');
  var positionPinValueElement = uploadFormElement.querySelector('.scale__value').value;
  var radioButtonsElement = uploadFormElement.querySelectorAll('.effects__radio');
  var imgUploadScaleElement = uploadFormElement.querySelector('.img-upload__scale');
  var textDescriptionElement = uploadFormElement.querySelector('.text__description');
  var hashtagsContainerElement = uploadFormElement.querySelector('.text__hashtags');
  var scaleValueNumber = parseInt(scaleValueElement, 10);
  var currentEffect = 'none';

  uploadFileElement.addEventListener('change', function (evt) {
    evt.stopPropagation();
    uploadOverlayElement.classList.remove('hidden');
    imgUploadScaleElement.classList.add('hidden');
  });

  var closeForm = function () {
    uploadOverlayElement.classList.add('hidden');
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== hashtagsContainerElement && document.activeElement !== textDescriptionElement) {
      closeForm();
    }
  });

  var printSize = function (size) {
    uploadFormElement.querySelector('.resize__control--value').value = size + '%';
    imageUploadElement.style.transform = 'scale(' + size / 100 + ')';
  };

  buttonMinusElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (scaleValueNumber > MIN_SCALE && scaleValueNumber <= MAX_SCALE) {
      scaleValueNumber = scaleValueNumber - STEP_SCALE;
      printSize(scaleValueNumber);
    }
  });

  buttonPlusElement.addEventListener('click', function () {
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
    imagePreviewElement.style.filter = result;
  };

  Array.prototype.forEach.call(radioButtonsElement, function (element, j) {
    radioButtonsElement[j].addEventListener('click', function (evt) {

      var target = evt.target.closest('.img-upload__effects');

      if (target) {
        imagePreviewElement.className = 'effects__preview--' + evt.target.value;
        if (evt.target.value !== 'none') {
          imgUploadScaleElement.classList.remove('hidden');
        } else {
          imgUploadScaleElement.classList.add('hidden');
        }
        currentEffect = evt.target.value;
        window.slider.setDefaultPosition();
        setEffect(positionPinValueElement);
      }
    });
  });

  var resetImgForm = function () {
    printSize(100);
    imagePreviewElement.setAttribute('class', '');
    imagePreviewElement.style.filter = 'none';
  };

  uploadCloseElement.addEventListener('click', function () {
    closeForm();
    resetImgForm();
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (!window.bigPicture.element.classList.contains('hidden')) {
        window.bigPicture.close();
      }
      if (!uploadFormElement.classList.contains('hidden')) {
        resetImgForm();
      }
    }
  });

  hashtagsContainerElement.addEventListener('input', function () {
    hashtagsContainerElement.setCustomValidity('');
    var textHashtags = hashtagsContainerElement.value.toLowerCase().trim();
    if (textHashtags === '') {
      return;
    }

    var hashtags = textHashtags.split(' ');
    var sameValue = window.util.shuffleArray(hashtags);

    if (sameValue) {
      hashtagsContainerElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    }
    if (hashtags.length > HASHTAG.maxCount) {
      hashtagsContainerElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== HASHTAG.code) {
        hashtagsContainerElement.setCustomValidity('Хэш-тег начинается с символа #');
      }
      if (hashtags[i] === HASHTAG.code) {
        hashtagsContainerElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      }
      if (hashtags[i].length > HASHTAG.maxChars) {
        hashtagsContainerElement.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
      }
    }
  });

  uploadFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(uploadFormElement), function () {
      closeForm();
      resetImgForm();
      uploadFormElement.reset();
    });
    evt.preventDefault();
  });

  window.form = {
    mapPinValue: positionPinValueElement,
    drawEffect: setEffect,
    resetImgForm: resetImgForm
  };
})();
