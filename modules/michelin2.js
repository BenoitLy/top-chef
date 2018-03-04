var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var urlStart = "https://restaurant.michelin.fr/restaurants/paris/restaurants-";
var urlEnd = "-etoiles-michelin";

module.exports = function michelin(){
  for(i = 1; i <= 3; i++){
    numberOfPages(i, listOfRestaurants);

    function numberOfPages(nbStars, callback){
      request(urlStart + nbStars + urlEnd, function(error, response, body) {
        if(error) {
          console.log("Error: " + error);
        }

        console.log("Status code: " );
        var $ = cheerio.load(body);

        var nbPages = 1;
        var nextPage = $('ul.pager.mr-pager-first-level-links > li.mr-pager-item.last');
        if(nextPage != ""){
          nbPages = nextPage.prev().find('a').text().trim();
        }

        callback(nbPages, nbStars);
      });
    };

    function listOfRestaurants(nbPages, nbStars){
      for(j = 1; j <= nbPages; j++){
        request(urlStart + nbStars + urlEnd + "/page-" + j, function(error, response, body) {
          if(error) {
            console.log("Error: " + error);
          }
          console.log("Status code: " + response.statusCode);

          var $ = cheerio.load(body);
          $('ul.poi-search-result > li').each(function( index ) {
            var restaurant = $(this).find('div.poi_card-description > div.poi_card-display-title').text().trim();
            fs.appendFileSync('restaurants-' + nbStars + '-etoiles-michelin.txt', restaurant + '\n');
          });
       });
      }
    }(i);
  }
}




