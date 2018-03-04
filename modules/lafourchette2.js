var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var buffer1 = fs.readFileSync('./restaurants-1-etoiles-michelin.txt');
var text1 = buffer1.toString();
var array1 = text1.split('\n');
var buffer2 = fs.readFileSync('./restaurants-2-etoiles-michelin.txt');
var text2 = buffer2.toString();
var array2 = text2.split('\n');
var buffer3 = fs.readFileSync('./restaurants-3-etoiles-michelin.txt');
var text3 = buffer3.toString();
var array3 = text3.split('\n');

var urlID = "https://m.lafourchette.com/api/restaurant-prediction?name=";
var nameRestaurant;
var searchURL;
var restaurants = [];
var restaurant;

module.exports = function lafourchette(){

	function handle(callback){
		browseArray(array1, 1);
		browseArray(array2, 2);
		browseArray(array3, 3);
		setTimeout(function(){
			callback(createJSONfile)
		}, 5000);
	}

	function browseArray(array, stars){
		for(i = 0; i < array.length; i++){
			nameRestaurant = array[i];
			getId(nameRestaurant, stars, getDeal);
		}; 
	}

	function getId(nameRestaurant, stars, callback){
		searchURL = encodeURIComponent(nameRestaurant);
		request.get(urlID + searchURL, (error, response, body) => {
		    let jsonID = JSON.parse(body);
		    var test = `${jsonID[0]}`;

			if(test != "undefined"){
				for(index = 0; index < jsonID.length; index++){
					if(`${jsonID[index].address.address_locality}` === "Paris"){
						idRestaurant = `${jsonID[index].id}`;
						break;    
					}
				}
			}
			callback(nameRestaurant, idRestaurant, stars, createRestaurant);
		});
	}
		
	function getDeal(nameRestaurant, idRestaurant, stars, callback){
		if(idRestaurant != 0){
			var urlDeal = "https://m.lafourchette.com/api/restaurant/" + idRestaurant + "/sale-type";
			var first = true;
			request.get(urlDeal, (error, response, body) => {
				let jsonDeal = JSON.parse(body);
				for(j = 0; j < jsonDeal.length; j++){
					if(`${jsonDeal[j].is_special_offer}` === "true"){
						if(first === true){
							restaurant = {
								"name": nameRestaurant,
								"michelin star(s)": stars,
								deals: []
							};
							first = false;
						}
						var deal = `${jsonDeal[j].title}`
						restaurant.deals.push(deal);
					}
				}
				if(first === false){
					callback(restaurant);
				}
			});
		}
	}

	function createRestaurant(restaurantTest){
		restaurants.push(restaurantTest);
	}

	function createString(callback){
		var jstr = JSON.stringify(restaurants, restaurant, "\t");
		callback(jstr);
	}

	function createJSONfile(jstr){
		fs.appendFileSync('./modules/jstr.json', jstr);
	}

	handle(createString);
}

				
				



/*const url ="https://m.lafourchette.com/api/restaurant-prediction?name=Au%20Palais%20Royal";
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

var url3 = "https://m.lafourchette.com/api/restaurant/324349/sale-type"
request.get(url3, (error, response, body) => {
	let json = JSON.parse(body);
	for(i = 0; i < json.length; i++){
		if(`${json[i].is_special_offer}` === "true"){
			console.log(`${json[i].title}`);
		}
		else{
			console.log("not special");
		}
	}
});*/


