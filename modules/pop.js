var fs = require('fs');

var buffer = fs.readFileSync('./restaurants-3-etoiles-michelin.txt');
var text = buffer.toString();
var array = text.split('\n');

var restaurants = [];

for(i = 0; i < 1; i++){
	var restau = {
		"name": array[i],
		"michelin star(s)": 1,
		deals: []
	}
	for(j = 0; j <= 3; j++){
		var deal = {
			j
		}
		restau.deals.push(deal);
	}
	restaurants.push(restau);
}

var jstr = JSON.stringify(restaurants, restau, "\t");
fs.appendFileSync('jstr.json', jstr);
