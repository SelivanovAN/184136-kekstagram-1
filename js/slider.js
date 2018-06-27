'use strict';

(function () {

  // ----------- Работа со спином ----------

  var scalePin = document.querySelector('.scale__pin');
  scalePin.style.left = '100%';
  var scaleLevel = document.querySelector('.scale__level');
  scaleLevel.style.width = '100%';

  scalePin.addEventListener('mouseup', function () {
    window.form.drowEffect();
  });

  var SLIDER_WIDTH = 450;

  scalePin.addEventListener('mousedown', function (evt) {
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

      var leftOffsetPin = scalePin.offsetLeft - shift.x;

      if (leftOffsetPin >= 0 && SLIDER_WIDTH >= leftOffsetPin) {
        // window.form.mapPin = (leftOffsetPin / SLIDER_WIDTH) * 100;
        scalePin.style.left = leftOffsetPin + 'px';
        scaleLevel.style.width = window.form.mapPin + '%';
        window.form.mapPin = Math.floor((leftOffsetPin * 100) / SLIDER_WIDTH);
        var pinNumber = parseInt(window.form.mapPin, 10);
        window.slider = {
          pinNumberValue: pinNumber
        };
        window.form.drowEffect(pinNumber);
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
})();
