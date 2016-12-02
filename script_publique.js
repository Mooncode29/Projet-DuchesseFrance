;var fs = require('fs');
var gsjson = require('google-spreadsheet-to-json');
var config = require('./config.js');
var values = require('./values.js');

var filleulesArray ;
var filleulesJson ;

gsjson({
	spreadsheetId: config.spreadsheetId,
})
.then(function(result){
	// reorganizeJson1(filleulesJsonOrigin, filleulesArray);
	filleulesArray = reorganizeJson(result, values);
	console.log(filleulesArray);
	// filleulesJson = createJson(filleulesArray, "filleules");
	// ecritureJson ();
	// console.log(filleulesJson);
})
.catch(function(err){
	console.log(err.message);
	console.log(err.stack);
});

function reorganizeJson1(jsonOrigin, finalArray){
	finalArray = jsonOrigin.map(function(item, i){
		// var object = { 
		// 	id: i+1,
		// 	nom: item[values('nom')],
		// 	prenom: item[values('prenom')],
		// 	email: item[values('email')],
		// 	societe: transformUndefined(item[values('societe')]),
		// 	experience: transformUndefined(item[values('experience')]),
		// 	profession: transformUndefined(item[values('profession')]), //undefined avec la fonction même si remplit, sinon écrit bien la valeur
		// 	specialite: transformUndefined(item[values('specialite')]),
		// 	ville: item[values('ville')],
		// 	telephone: transformUndefined(item[values('telephone')]),
		// 	twitter: transformUndefined(item[values('twitter')]),
		// 	linkedin: transformUndefined(item[values('linkedin')]),
		// 	facebook: transformUndefined(item[values('facebook')]),
		// 	mailingList: transformIntoBoolean(item[values('mailingList')]),
		// 	description: transformUndefined(item[values('description')]),
		// 	modeInteraction: transformUndefined(item[values('modeInteraction')]),
		// 	map: transformIntoBoolean(item[values('map')])
		// }	
		// return object;
	});
}

function reorganizeJson(data, keys){
	return data.map(function(item){
		var output = {};
		for(var k in keys){
			output[k] = item[keys[k]];
			if(mailingList === item[keys[k]]){
				output[k] = transformIntoBoolean(item[keys[k]]);
			}
			else {
				output[k] = transformUndefined(item[keys[k]]);
			}
		}
		return output;
	});
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

function ecritureJson(){
	var stringJson= JSON.stringify(filleulesJson);
	fs.writeFile('public/filleules.json',stringJson,'utf8', (err) => {
		if (err) throw err;
		console.log('It\'s saved!');
	});
}
