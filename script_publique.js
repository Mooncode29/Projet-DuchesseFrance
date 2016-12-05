var fs = require('fs');
var gsjson = require('google-spreadsheet-to-json');
var config = require('./config.js');
var md5 = require('md5');
var valuesFilleules = require('./valuesFilleules.js');
var valuesMarraines = require('./valuesMarraines.js');

var filleulesOutput ;
var filleulesJson ;
var marrainesOutput ; 
var marrainesJson ;

gsjson({
	spreadsheetId: config.spreadsheetIdMarraines,
})
.then(function(result){
	
	marrainesOutput = reorganizeJson(result, valuesMarraines, "marraine");
	marrainesJson = createJson(marrainesOutput, "marraines");
	ecritureJson(marrainesJson, __dirname + '/public/marraines.json');
})
.catch(function(err){
	console.log(err.message);
	console.log(err.stack);
});

gsjson({
	spreadsheetId: config.spreadsheetIdFilleules,
})
.then(function(result){
	filleulesOutput = reorganizeJson(result, valuesFilleules, "filleule");
	filleulesJson = createJson(filleulesOutput, "filleules");
	ecritureJson(filleulesJson, __dirname + '/public/filleules.json');
})
.catch(function(err){
	console.log(err.message);
	console.log(err.stack);
});


function reorganizeJson(data, keys, groupMember){
	return data.map(function(item){
		var output = {};
		createId(output, item.horodateur, item.nom, item.prenom);
		addStatus(output, groupMember);
		for(var k in keys){
			output[k] = item[keys[k]] || '';
			if(k === 'mailingList'){
				output[k] = booleanMailingList(item[keys[k]]);
			}
			if(k === 'map'){
				output[k] = booleanMap(item[keys[k]]);
			}	
		}
		console.log(output);
		return output;
	});
}

function createId(object, horodateur, nom, prenom){
	object.id = md5(horodateur + nom + prenom);
}

function addStatus(object, group){
	object.status = group;
}

function booleanMailingList(value){
	return (value === 'Oui');
}

function booleanMap(value){
	if(!value){
		return true;
	}
	return !(value.includes('Non'));
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