'use strict';

(function () {

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
    var textHashtags = hashtagsContainer.value.toLowerCase().trim();
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
})();
