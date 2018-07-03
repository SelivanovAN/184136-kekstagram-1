'use strict';

(function () {
  var activeClassName = 'img-filters__button--active';

  var filterFormElement = document.querySelector('.img-filters__form');

  var updatePhotos = function (filterName) {
    var filteredPhotos = window.photos.data().slice();
    switch (filterName) {
      case 'filter-new':
        filteredPhotos = 'grayscale(' + (sliderValue / 100) + ')';
        break;
      case 'filter-discussed':
        filteredPhotos = filteredPhotos.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        break;
    }
    window.photos.render(filteredPhotos);
  };

  var onFilterClick = function (evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON') {
      var selectedFilter = filterFormElement.querySelector('.' + activeClassName);
      if (selectedFilter) {
        selectedFilter.classList.remove(activeClassName);
      }
      target.classList.add(activeClassName);
      updatePhotos(target.id);
    }
  };

  filterFormElement.addEventListener('click', onFilterClick);

  window.updatePhotos = updatePhotos;

  // **************************************************

  // var filterByNew = function () {
  //   var arrNew = photos.slice().sort(function () {
  //     return 0.5 - Math.random();
  //   });
  //
  //   return arrNew.slice(0, 10);
  // }
  //

})();
