BTC.controller('BTCDashboardCtrl', ['$scope', 'BTCRestAPI', '$interval',
  function ($scope, BTCRestAPI, $interval) {

    var milliSecondsToWait = 15000; //15 seconds
    var oneSecond = 1000;
    var timer;
    var everySecTimer;
    var numRecords = 5;
    $scope.latestPrices = [];
    $scope.counter = milliSecondsToWait/1000;
    $scope.shouldShowLoadingGIF = true;
    $scope.shouldShowTimer = false;

    /*
       This function makes sure that there are atmost "numRecords" 
       in the latestPrices array
    */
    var addLastestPrice = function (price) {
      if ($scope.latestPrices.length >= numRecords) {
        $scope.latestPrices.pop();
      }
      $scope.latestPrices.unshift(price);
    }

    /*
    	* starts showing the loadingGIF when an REST Call is made
        * When the response is received, it
        	* Stops the showing the loadingGIF
        	* Starts a 15 second counter
        * calls itself after 15 seconds using setTimeout
    */	
    var getPrices = function () {

      //Show the user that HTTP request has been made
      $scope.shouldShowLoadingGIF = true;
      BTCRestAPI.getCurrentPrice()
        .then(function (data) {
          
          $scope.shouldShowLoadingGIF = false;
          addLastestPrice(data);
          everySecTimer = $interval(function () {

            $scope.shouldShowTimer = true;
            $scope.counter--;
            if ($scope.counter == 0) {
              $scope.counter = milliSecondsToWait/1000;
              $scope.shouldShowTimer = false;
            }

          }, 1000)

          timer = setTimeout(function () {
            $scope.shouldShowTimer = false;
            $scope.counter = milliSecondsToWait/1000;
            $interval.cancel(everySecTimer);
            getPrices();
          }, milliSecondsToWait);
        }, function (error) {	
          console.log(error);
          clearTimeout(timer);

        })
    };

    /*
   		Make the initial HTTP Call
    */
    getPrices();
  }
]);