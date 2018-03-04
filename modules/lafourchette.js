var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var buffer = fs.readFileSync('./restaurants-1-etoiles-michelin.txt');
var text = buffer.toString();
var array = text.split('\n');

var urlID = "https://m.lafourchette.com/api/restaurant-prediction?name=";
var search;
var searchURL;
var restaurants = [];

function looking(){
	var restaurants = [];
	for(i = 0; i < array.length; i++){
		search = array[i];
		searchURL = encodeURIComponent(search);

		request.get(urlID + searchURL, (error, response, body) => {
		    let jsonID = JSON.parse(body);
		    var test = `${jsonID[0]}`;

			if(test != "undefined"){
				for(index = 0; index < jsonID.length; index++){
					if(`${jsonID[index].address.address_locality}` === "Paris"){
						var idRestaurant = `${jsonID[index].id}`;
					    var urlDeal = "https://m.lafourchette.com/api/restaurant/" + idRestaurant + "/sale-type";
						request.get(urlDeal, (error, response, body) => {
							let jsonDeal = JSON.parse(body);
							for(j = 0; j < jsonDeal.length; j++){
								if(`${jsonDeal[j].is_special_offer}` === "true"){
									var restau = {
										"name": i,
										"michelin star(s)": 1,
										"deal": `${jsonDeal[j].title}`
									};
									restaurants.push(restau);
									var jstr = JSON.stringify(restaurants, restau, "\t");
									fs.appendFileSync('jstr.json', jstr);
								}
							}
						});
						break;
					}
				}
			}
		});
	};
}

looking();


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


