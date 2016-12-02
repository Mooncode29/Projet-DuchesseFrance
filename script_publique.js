var fs = require('fs');
var gsjson = require('google-spreadsheet-to-json');
var config = require('./config.js');
var values = require('./values.js');
var md5 = require('md5');

var filleulesOutput ;
var filleulesJson ;
var marrainesOutput ; 
var marrainesJson ;

gsjson({
	spreadsheetId: config.spreadsheetIdMarraines,
})
.then(function(result){
	marrainesOutput = reorganizeJson(result, values);
	marrainesJson = createJson(marrainesOutput, "marraines");
	ecritureJson(marrainesJson, 'public/marraines.json');
})
.catch(function(err){
	console.log(err.message);
	console.log(err.stack);
});

gsjson({
	spreadsheetId: config.spreadsheetIdFilleules,
})
.then(function(result){
	filleulesOutput = reorganizeJson(result, values);
	filleulesJson = createJson(filleulesOutput, "filleules");
	ecritureJson(filleulesJson, 'public/filleules.json');
})
.catch(function(err){
	console.log(err.message);
	console.log(err.stack);
});



function reorganizeJson(data, keys){
	return data.map(function(item){
		var output = {};
		createId(output, item.horodateur, item.nom, item.prenom);
		for(var k in keys){
			output[k] = item[keys[k]];
			if(k === 'mailingList' || k === 'map'){
				output[k] = transformIntoBoolean(item[keys[k]]);
			}
			else {
				output[k] = transformUndefined(item[keys[k]]);
			}
		}
		return output;
	});
}

function createId(object, horodateur, nom, prenom){
	object.id = md5(horodateur + nom + prenom);
}

function transformIntoBoolean(value){
	if(value === "Non"){
		return false;
	}
	else {
		return true;
	}
}

function transformUndefined(value){
	if(value === undefined){
		return '';
	}
	else {
		return value;
	}
}

function createJson(array, group){
	var Json = {}
	Json[group] = array;
	return Json ;
}

function ecritureJson(file, path){
	var stringJson= JSON.stringify(file);
	fs.writeFile(path ,stringJson, 'utf8', (err) => {
		if (err) throw err;
		console.log('It\'s saved!');
	});
}
