'use strict';

(function () {
  var activeClassName = 'img-filters__button--active';
  var filterFormElement = document.querySelector('.img-filters__form');
  var filteredPhotos = [];

  var updatePhotos = function (filterName) {
    filteredPhotos = window.gallery.data().slice();
    switch (filterName) {
      case 'filter-new':
        filteredPhotos = filteredPhotos.sort(function () {
          return 0.5 - Math.random();
        });
        filteredPhotos = filteredPhotos.slice(0, 10);
        break;
      case 'filter-discussed':
        filteredPhotos = filteredPhotos.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        break;
    }
    window.gallery.render(filteredPhotos);
  };

  filterFormElement.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.tagName === 'BUTTON') {
      var selectedFilter = filterFormElement.querySelector('.' + activeClassName);

      if (selectedFilter) {
        selectedFilter.classList.remove(activeClassName);
      }

      target.classList.add(activeClassName);

      window.debounce(function () {
        updatePhotos(target.id);
      });
    }
  });

  window.filter = {
    updatePhotos: updatePhotos,
    photos: function () {
      return filteredPhotos;
    }
  };
})();
