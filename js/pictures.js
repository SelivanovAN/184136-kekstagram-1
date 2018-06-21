'use strict';

var COUNT_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var PHOTO_COMMENTS = [
  'Всё отлично',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PHOTO_DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

// --------- функция генерации случайных чисел---------
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// --------- фукнция перемешивания массива ---------
var shuffleComments = function (array) {
  var j;
  var temp;
  var i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

// --------- Генерируется массив фоток количеством 25 шт из цикла (функция генерации случайных данных) ---------
var photos = [];

var appendPhotos = function () {
  for (var j = 0; j < COUNT_PHOTOS; j++) {
    photos.push({
      url: 'photos/' + (j + 1) + '.jpg',
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: shuffleComments(PHOTO_COMMENTS).slice(0, getRandomNumber(0, PHOTO_COMMENTS.length - 1)),
      description: PHOTO_DESCRIPTIONS[getRandomNumber(0, PHOTO_DESCRIPTIONS.length - 1)]
    });
  }
};

appendPhotos();

var gallery = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;

// --------- Заполняем данными сгенерированные карточки (функция создания DOM-элемента на основе JS-объекта )---------
var renderPhoto = function (photo) {
  // функция создания DOM-элемента на основе JS-объекта
  // функция заполнения блока DOM-элементами на основе массива JS-объектов
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
  return photoElement;
};

var addPhotoToFragment = function () {
  var fragment = document.createDocumentFragment();
  // --------- функция заполнения блока DOM-элементами на основе массива ---------
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  gallery.appendChild(fragment);
};

addPhotoToFragment();

var MIN_NUMBER_COMMENTS = 1;
var MAX_NUMBER_COMMENTS = 6;

var bigPicture = document.querySelector('.big-picture');

var renderBigPicture = function (photo) {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  var socialComments = bigPicture.querySelector('.social__comments');
  socialComments.innerHTML = '';

  var fragmentBigPicture = document.createDocumentFragment();

  for (var l = 0; l < photo.comments.length; l++) {
    var listElement = document.createElement('li');
    listElement.classList.add('social__comment');

    var commentImage = document.createElement('img');
    commentImage.src = 'img/avatar-' + getRandomNumber(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS) + '.svg';
    commentImage.classList.add('social__picture');
    commentImage.width = 35;
    commentImage.height = 35;
    listElement.appendChild(commentImage);

    var textElement = document.createElement('p');
    textElement.textContent = photo.comments[l];
    textElement.classList.add('social__text');
    listElement.appendChild(textElement);

    fragmentBigPicture.appendChild(listElement);
  }
  socialComments.appendChild(fragmentBigPicture);
};

renderBigPicture(photos[8]);

// bigPicture.classList.remove('hidden');

var socialCommentCount = document.querySelector('.social__comment-count');
var socialCommentLoad = document.querySelector('.social__loadmore');
socialCommentCount.classList.add('visually-hidden');
socialCommentLoad.classList.add('visually-hidden');

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
var positionPin = uploadForm.querySelector('.scale__value').value;

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

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== hashtagsContainer && document.activeElement !== textDescription) {
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

var setEffect = function () {
  var result;
  switch (currentEffect) {
    case 'chrome':
      result = 'grayscale(' + (positionPin / 100) + ')';
      break;
    case 'sepia':
      result = 'sepia(' + (positionPin / 100) + ')';
      break;
    case 'marvin':
      result = 'invert(' + positionPin + '%)';
      break;
    case 'phobos':
      result = 'blur(' + (positionPin * 3 / 100) + 'px)';
      break;
    case 'heat':
      result = 'brightness(' + ((positionPin * 2 / 100) + 1) + ')';
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
      setEffect();
    }
  });
}


// ----------- Показываем фотографии в полноэкранном формате при нажатии на маленькое----------

gallery.addEventListener('click', function (evt) {
  var targetElement = evt.target.closest('.picture__link');
  if (targetElement) {
    var imageElement = targetElement.querySelector('img');

    if (imageElement) {
      if (pictureElements.length === 0) {
        pictureElements = gallery.querySelectorAll('.picture__img');
      }
      var index = Array.from(pictureElements).indexOf(imageElement);
      renderBigPicture(photos[index]);
      bigPicture.classList.remove('hidden');
    }
  }
});

// ----------- Закрываем окно bigPicture ----------
var btnCloseBigPicture = bigPicture.querySelector('.big-picture__cancel');

var resetImgForm = function () {
  printSize(100);
  imagePreview.setAttribute('class', '');
  imagePreview.style.filter = 'none';
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  resetImgForm();
};

btnCloseBigPicture.addEventListener('click', closeBigPicture);

uploadClose.addEventListener('click', function () {
  closeForm();
  resetImgForm();
});

window.addEventListener('keydown', function (evt) { // закрываем и большую картинку и форму
  if (evt.keyCode === ESC_KEYCODE) {
    if (!bigPicture.classList.contains('hidden')) {
      closeBigPicture();
    }
    if (!uploadForm.classList.contains('hidden')) {
      resetImgForm();
    }
  }
});

// ----------- Работа со спином ----------

var scalePin = document.querySelector('.scale__pin');
scalePin.style.left = '100%';
var scaleLevel = document.querySelector('.scale__level');
scaleLevel.style.width = '100%';

scalePin.addEventListener('mouseup', function () {
  setEffect();
});

// ----------- Работа с хештегами и комментариями ----------

var hashtagsContainer = document.querySelector('.text__hashtags'); // double form

function searchForSameValues(arr) {
  for (var i = 0; i < arr.length; i++) {
    var arrValue = arr[i];
    for (var l = 0; l < arr.length; l++) {
      if (arr[l] === arrValue && l !== i) {
        return true;
      }
    }
  }
  return false;
}

var HASHTAG = {
  code: '#',
  maxCount: 5,
  maxChars: 20
};

hashtagsContainer.addEventListener('input', function () {
  hashtagsContainer.setCustomValidity('');
  var textHashtags = hashtagsContainer.value.lower().trim();
  var hashtags = textHashtags.split(' ');
  var sameValue = searchForSameValues(hashtags);

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
