'use strict';

(function () {
  var MIN_NUMBER_COMMENTS = 1;
  var MAX_NUMBER_COMMENTS = 6;
  var MAX_COMMENTS = 5;

  var bigPictureElement = document.querySelector('.big-picture');
  var btnCloseBigPicture = bigPictureElement.querySelector('.big-picture__cancel');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCommentLoad = document.querySelector('.social__loadmore');

  var imageValue = {
    width: 35,
    height: 35
  };

  var renderBigPicture = function (photo) {
    bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
    bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = photo.description;

    var socialComments = bigPictureElement.querySelector('.social__comments');
    socialComments.innerHTML = '';

    var fragmentBigPicture = document.createDocumentFragment();
    var countComments = photo.comments.length > MAX_COMMENTS ? MAX_COMMENTS : photo.comments.length;

    for (var l = 0; l < countComments; l++) {
      var listElement = document.createElement('li');
      listElement.classList.add('social__comment');

      var commentImage = document.createElement('img');
      commentImage.src = 'img/avatar-' + window.util.getRandomNumber(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS) + '.svg';
      commentImage.classList.add('social__picture');
      commentImage.width = imageValue.width;
      commentImage.height = imageValue.height;
      listElement.appendChild(commentImage);

      var textElement = document.createElement('p');
      textElement.textContent = photo.comments[l];
      textElement.classList.add('social__text');
      listElement.appendChild(textElement);

      fragmentBigPicture.appendChild(listElement);
    }
    socialComments.appendChild(fragmentBigPicture);
  };

  socialCommentCount.classList.add('visually-hidden');
  socialCommentLoad.classList.add('visually-hidden');

  var closeBigPicture = function () {
    bigPictureElement.classList.add('hidden');
    window.form.resetImgForm();
  };

  btnCloseBigPicture.addEventListener('click', closeBigPicture);

  window.bigPicture = {
    element: bigPictureElement,
    render: renderBigPicture,
    close: closeBigPicture
  };
})();
