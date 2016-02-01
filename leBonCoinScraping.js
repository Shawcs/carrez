var cheerio = require("cheerio");

var url = "http://www.leboncoin.fr/ventes_immobilieres/915700197.htm?ca=12_s";
var http = require("http");

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

download(url, function(data) {
  if (data) {
    // console.log(data);
    var $ = cheerio.load(data);
   $('span.price').each(function(i, element){
      var price = $(this);
      console.log(price.text());
    });

 $('.lbcParams table tbody tr').each(function(i, element){
 	var b = $(this);

 		//console.log( b );
 		//console.log($(this).find(".price class").text());
      var b = $(this);
      console.log(b.text());

    });
  }
});