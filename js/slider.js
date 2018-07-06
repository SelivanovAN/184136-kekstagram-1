'use strict';

(function () {
  var SLIDER_WIDTH = 450;
  var MAX_PERCENT = 100;

  var scalePinElement = document.querySelector('.scale__pin');
  var scaleLevelElement = document.querySelector('.scale__level');

  var setDefaultPosition = function () {
    scalePinElement.style.left = '100%';
    scaleLevelElement.style.width = '100%';
  };

  setDefaultPosition();

  scalePinElement.addEventListener('mouseup', function () {
    window.form.drawEffect(parseInt(window.form.mapPinValue, 10));
  });

  scalePinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var leftOffsetPin = scalePinElement.offsetLeft - shift.x;

      if (leftOffsetPin >= 0 && SLIDER_WIDTH >= leftOffsetPin) {
        scalePinElement.style.left = leftOffsetPin + 'px';
        scaleLevelElement.style.width = window.form.mapPinValue + '%';
        window.form.mapPinValue = Math.floor((leftOffsetPin * MAX_PERCENT) / SLIDER_WIDTH);
        window.form.drawEffect(parseInt(window.form.mapPinValue, 10));
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.slider = {
    setDefaultPosition: setDefaultPosition
  };
})();
