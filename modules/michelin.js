var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = function numberOfPages(listOfRestaurants){
  request("https://restaurant.michelin.fr/restaurants/paris/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin", function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }

    console.log("Status code: " + response.statusCode);
    var $ = cheerio.load(body);
    var counter = 1;

    $('ul.pager.mr-pager-first-level-links > li.mr-pager-item:has(a.mr-pager-link)').each(function( index ) {
      counter++;
    });
    listOfRestaurants(counter);
  });

  function listOfRestaurants(nbPages){
    for(i = 1; i <= nbPages; i++){
      request("https://restaurant.michelin.fr/restaurants/paris/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-" + i, function(error, response, body) {
        if(error) {
          console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);

        var $ = cheerio.load(body);

        $('ul.poi-search-result > li').each(function( index ) {
          var restaurant = $(this).find('div.poi_card-description > div.poi_card-display-title').text().trim();
          fs.appendFileSync('restaurants.txt', restaurant + '\n');
        });
     });
    }
  }
}




