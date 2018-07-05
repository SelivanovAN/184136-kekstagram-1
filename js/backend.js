'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var STATUS_CODE_OK = 200;

  var getJSON = function (onLoad, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    if (method === 'GET') {
      xhr.open('GET', URL_GET);
      xhr.send();
    } else if (method === 'POST') {
      xhr.open('POST', URL_POST);
      xhr.send(data);
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      getJSON(onLoad, onError, 'GET');
    },
    save: function (data, onLoad, onError) {
      getJSON(onLoad, onError, 'POST', data);
    }
  };
})();
