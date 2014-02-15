var async = require('async');
var https = require('https');
var http = require('http');
var express = require('express');
var port = Number(5000);
var app = express();
var server = require('http').createServer(app).listen(port);

app.use(express.static(__dirname + '/public'));
app.use(app.router);



console.log('The server is running at localhost:' + port);


app.get('/getPrices', function (request, response) {

  /*
    This function constructs the HTTP request with various parameters
  */
  var createHTTPRequest = function (currency) {
    return {
      host: 'api.bitcoinaverage.com',
      port: 443,
      path: '/ticker/global/' + currency + '/last',
      method: 'GET'
    }
  };


  /*
    This function makes the HTTP GET request.
  */

  var getCurrentPriceForCurrency = function (currency, callback) {
    https.get(createHTTPRequest(currency), function (res) {
      var resultStr = '';
      res.on('data', function (data) {
        process.stdout.write(data);
        resultStr = resultStr.concat(data);
        callback(null, resultStr);
      });

    }).on('error', function (e) {
      console.error(e);
      callback(e,null);
    });
  };

  
  /*
      Calls the two API endpoints in parallel and the results 
      are processed by "function (err, result)""
  */
  async.parallel({
    BTC_INR: function (callback) {
      getCurrentPriceForCurrency('INR', callback);
    },
    BTC_CAD: function (callback) {
      getCurrentPriceForCurrency('CAD', callback);
    }
  }, function (err, result) {
    if (!err) {
      var httpResponseObj = {
        'CAD': result.BTC_CAD,
        'INR': result.BTC_INR,
        'timestamp': Date.now()
      };
      console.log(JSON.stringify(httpResponseObj));
      response.setHeader("Content-Type", "application/json");
      response.send(JSON.stringify(httpResponseObj));
    } 
    else {
      response.status(500).send("");
    }

  })
});