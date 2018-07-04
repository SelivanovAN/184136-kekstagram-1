'use strict';

(function () {
  var activeClassName = 'img-filters__button--active';

  var filterFormElement = document.querySelector('.img-filters__form');

  var updatePhotos = function (filterName) {
    var filteredPhotos = window.photos.data().slice();
    switch (filterName) {
      case 'filter-new':
        filteredPhotos = filteredPhotos.sort(function () {
          return 0.5 - Math.random();
          // for (var i = filteredPhotos.length - 1; i > 0; i--) {
          //   var j = Math.floor(Math.random() * (i + 1));
          //   var swap = filteredPhotos[j];
          //   filteredPhotos[j] = filteredPhotos[i];
          //   filteredPhotos[i] = swap;
          // }
          //
          // return filteredPhotos;
        });
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
    window.photos.remove();
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
})();
