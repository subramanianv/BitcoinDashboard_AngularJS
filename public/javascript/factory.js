BTC.factory('BTCRestAPI', ['$http', '$q',
  function ($http, $q) {
    return {
      getCurrentPrice: function () {
      	var baseURL='http://localhost:5000/';
      	var APIPath='getPrices';
        return $http.get(baseURL+APIPath)
          .then(function (response) {
            return response.data;
          }, function (error) {
            return $q.reject(error);
          });
      }
    };
  }
]);
