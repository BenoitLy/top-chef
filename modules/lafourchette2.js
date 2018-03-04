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
var testQuand = 0;
var promesses = [];

function handle(callback){
	var promesse1 = browseArray(array1);
	promesses.push(promesse1);
	var promesse2 = browseArray(array2);
	promesses.push(promesse2);
	var promesse3 = browseArray(array3);
	promesses.push(promesse3);
	Promise.all(promesses).then(callback(createJSONfile)).catch(function (err) {
	    console.error('Une erreur est survenue lors de la lecture des fichiers');
	});
}

function browseArray(array){
	testQuand++;
	console.log('browseArray :' + testQuand);
	for(i = 0; i < array.length; i++){
		nameRestaurant = array[i];
		getId(nameRestaurant, getDeal);
	};
}


function getId(nameRestaurant, callback){
	var idRestaurant = 0;
	testQuand++;
	console.log('getId :' + testQuand);

	searchURL = encodeURIComponent(nameRestaurant);
	request.get(urlID + "Au%20Palais%20Royal", (error, response, body) => {
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
		callback(nameRestaurant, idRestaurant, createRestaurant);
	});
}
	
function getDeal(nameRestaurant, idRestaurant, callback){
	testQuand++;
	console.log('getDeal :' + testQuand);

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
							"michelin star(s)": 1,
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
	testQuand++;
	console.log('createRestaurant :' + testQuand);
	restaurants.push(restaurantTest);
}

function createString(callback){
	testQuand++;
	console.log('createString :' + testQuand);
	var jstr = JSON.stringify(restaurants, restaurant, "\t");
	callback(jstr);
}

function createJSONfile(jstr){
	testQuand++;
	console.log('createJSONfile :' + testQuand);
	fs.appendFileSync('jstr.json', jstr);
}

handle(createString);

				
				



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


