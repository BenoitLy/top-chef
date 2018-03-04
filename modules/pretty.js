var prettyjson = require('prettyjson');
var fs = require('fs');

var restaurants = JSON.parse(fs.readFileSync('./jstr.json', 'utf8'));

 console.log(prettyjson.render(restaurants, {
  keysColor: 'green',
  numberColor: 'yellow',
  dashColor: 'black',
  stringColor: 'white'
}));