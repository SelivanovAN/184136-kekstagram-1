'use strict';

(function () {
  var filters = document.querySelector('.img-filters');
  var filterBtnPopular = filters.querySelector('#filter-popular');
  var filterBtnNew = filters.querySelector('#filter-new');
  var filterBtnDiscused = filters.querySelector('#filter-discussed');


  filterBtnPopular.addEventListener('mousedown', function () {
    filterBtnNew.classList.remove('img-filters__button--active');
    filterBtnDiscused.classList.remove('img-filters__button--active');
    filterBtnPopular.classList.add('img-filters__button--active');

  });

  filterBtnNew.addEventListener('mousedown', function () {
    filterBtnPopular.classList.remove('img-filters__button--active');
    filterBtnDiscused.classList.remove('img-filters__button--active');
    filterBtnNew.classList.add('img-filters__button--active');
  });

  var filterByDiscuss = function () {
    var arrDiscuss = photos.slice().sort(function (a, b) {
      var adiscussion = a.comments.length;
      var bdiscussion = b.comments.length;
      var discussionDiff = bdiscussion - adiscussion;

      if (discussionDiff === 0) {
        discussionDiff = b.likes - a.likes;
      }
      return discussionDiff;
    });

    return arrDiscuss;
  };

  filterBtnDiscused.addEventListener('mousedown', function () {
    filterBtnNew.classList.remove('img-filters__button--active');
    filterBtnPopular.classList.remove('img-filters__button--active');
    filterBtnDiscused.classList.add('img-filters__button--active');

    filterByDiscuss();

  });

  window.filters = {
    active: filterBtnPopular
  };
  // img-filters__button--active

  // var changeEyesColor = function (colorEyes) {
  //   wizardEyes.style.fill = colorEyes;
  //   newEyesColor = colorEyes;
  //   window.updateWizards();
  // };
  //
  // wizardEyes.addEventListener('click', function () { // событие по изменению цвета глаз мага при нажатии
  //   var colorEyes = COLOR_WIZARD_EYES[window.util.getRandomIndex(0, COLOR_WIZARD_EYES.length - 1)];
  //   window.debounce(changeEyesColor(colorEyes));
  // });
  var photos = [];

  // var getRank = function (wizard) {
  //   var rank = 0;
  //
  //   if (wizard.colorCoat === window.characterWizard.coatColor()) {
  //     rank += 2;
  //   }
  //   if (wizard.colorEyes === window.characterWizard.eyesColor()) {
  //     rank += 1;
  //   }
  //
  //   return rank;
  // };

  var updatePhotos = function () {
    window.photos.render(window.photos.data().slice())

    //.sort(function (left, right) {
        // var rankDiff = getRank(right) - getRank(left);
        // if (rankDiff === 0) {
        //   rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
        // }
        // return rankDiff;
      //}));
  };

  window.updatePhotos = updatePhotos;



  // **************************************************


  //
  // var filterByPopularity = function () {
  //   return photos;
  // }
  //
  // var filterByNew = function () {
  //   var arrNew = photos.slice().sort(function () {
  //     return 0.5 - Math.random();
  //   });
  //
  //   return arrNew.slice(0, 10);
  // }
  //
  // window.filter = {
  //   init: showFilters
  // };
})();
