var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var buffer = fs.readFileSync('./restaurants.txt');
var text = buffer.toString();
var array = text.split('\n');

var url23 = "https://www.lafourchette.com/search-refine/";
var search;
var searchURL;

/*request("https://m.lafourchette.com/fr_FR/search?searchText=Palais%20Royal", function(error, response, body) {
        if(error) {
          console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);

        var $ = cheerio.load(body);

        fs.appendFileSync('test.txt', body);
       

        
        
        $('body').filter(function(){
        	console.log("COME ON !!!");

        	var data = $(this);
        	var test = data.html();

        	console.log(test); 	
        });
     });*/

const url =
  "https://m.lafourchette.com/api/restaurant-prediction?name=Au%20Palais%20Royal";
request.get(url, (error, response, body) => {
  let json = JSON.parse(body);
  var ya = `${json[0].id}`;
  console.log(ya);

  var url2 = "https://m.lafourchette.com/api/restaurant/" + ya + "/sale-type";
  request.get(url2, (error, response, body) => {
  let json = JSON.parse(body);
  var test = `${json[0].title}`;
  console.log(test);
  
});

});

/*const url = "https://m.lafourchette.com/fr_FR/search?searchText=Palais%20Royal";
const axios = require("axios");

axios
  .get(url)
  .then(response => {
  	fs.appendFileSync('come.txt', response.setEncoding("utf8"));

  })
  .catch(error => {
    console.log(error);
  });*/

/*const https = require("https");
const url =
  "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";
https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    //body = JSON.parse(body);
    console.log(body);
  });
});*/

        
        
        /*$('body').filter(function(){
        	console.log("COME ON !!!");

        	var data = $(this);
        	var test = data.html();

        	console.log(test); 	
        });
     });*/



/*request("https://m.lafourchette.com/fr_FR/search?searchText=Palais%20Royal", function(error, response, body) {
        if(error) {
          console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);

        var $ = cheerio.load(body);

        console.log("1er test");

        
        var test = $('.restaurantResult-promotion.ng-binding.ng-scope.restaurantResult-promotion--special').text().trim();

        console.log("2eme : " + test);

     });

request("https://m.lafourchette.com/api/restaurant-prediction?name=Palais%20Royal", function(error, response, body) {
        if(error) {
          console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);

        var $ = cheerio.load(body);

        console.log("1er test");

        
        var test = $('span.type-string').text().trim();

        console.log("2eme : " + test);
     });*/

/*request("https://www.lafourchette.com/search-refine/Pur'%20", function(error, response, body){
        if(error) {
          console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);

        var $ = cheerio.load(body);
        console.log("c'est good");

        $('ul.list-unstyled > li').each(function( index ){
        	console.log("c'est bon bon");
        	var promo = $(this).find('div.resultItem-information > div.resultItem-saleType.resultItem-saleType--event > a').text().trim();
        	console.log(promo);
        });
    });*/

/*for(i = 0; i < 2; i++){
	search = array[i];
	searchURL = encodeURIComponent(search);

    request("https://www.lafourchette.com/search-refine/Pur'%20", function(error, response, body){
        if(error) {
          console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);

        var $ = cheerio.load(body);

        $('ul.list-unstyled > li').each(function( index ){
        	console.log("oui");
        	var promo = $(this).find('div.resultItem-information > div.resultItem-saleType.resultItem-saleType--event > a').text().trim();
        	console.log(promo);
        });
    });
}*/