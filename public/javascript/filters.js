BTC.filter('convertToHumanReadableFormat', function () {
  /*
  	Converts a timestamp into HH:MM:SS AM/PM
  */
  return function (dateStr) {
    var d = new Date(dateStr);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = 'AM';
    var h = hh;
    if (h >= 12) {
      h = hh - 12;
      dd = 'PM';
    }
    if (h == 0) {
      h = 12;
    }
    m = m < 10 ? '0' + m : m;

    s = s < 10 ? '0' + s : s;

    h = h < 10 ? '0' + h : h;

    return h + ':' + m + ':' + s + ' ' + dd;

  }
});