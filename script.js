var express = require('express')
var app = express()
var fs = require('fs');
// var bodyParser = require('body-parser');

// app.get('/', function (req, res) {
//   res.send('Hello World')
// console.log(req.body);
// })
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

var brutDataFilleules = {
	"range": "Sheet1!A1:D5",
	"majorDimension": "ROWS",
	"values": [
		["Item", "Cost", "Stocked", "Ship Date"],
		["Wheel", "$20.50", "4", "3/1/2016"],
		["Door", "$15", "2", "3/15/2016"],
		["Engine", "$100", "1", "30/20/2016"],
		["Totals", "$135.5", "7", "3/20/2016"]
	],
}

var valuesFilleules = brutDataFilleules.values;
var objectTableFilleules = [];
var keyTable = ["dateInscription", "nom", "prenom", "email", "societe", "experience", "profession", "specialite", "ville", "telephone", "twitter", "linkedin", "facebook", "mailingList", "description", "modeInteraction", "map"];

createObjects(valuesFilleules);
var filleulesJson = createJson(objectTableFilleules, "filleules");
var stringJson= JSON.stringify(filleulesJson);



function createObjects(table){
	for(var i = 1 ; i < table.length ; i++){
		var object = {};
		object["id"] = i ;
		for(var j = 0 ; j < table[i].length ; j++){
			object[keyTable[j]] = table[i][j];
		}
		objectTableFilleules.push(object);
	}
}

function createJson(array, group){
	var Json = {}
	Json[group] = array;
	return Json ;
}


fs.writeFile('filleules.json',stringJson, (err) => {
  if (err) throw err;
  console.log('It\'s saved');
});
