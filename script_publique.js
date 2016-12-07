var fs = require('fs');
var gsjson = require('google-spreadsheet-to-json');
var config = require('./config.js');
var md5 = require('md5');
var values = require('./values.js');
// var valuesMarraines = require('./valuesMarraines.js');

var curseur = 0;

var groupTable = [
	{
		spreadsheetId: config.spreadsheetIdMarraines,
		status: "marraine",
		keys: values.marraines
	},
	{
		spreadsheetId: config.spreadsheetIdFilleules,
		status: "filleule",
		keys: values.filleules
	}
];

getDataGsheets(groupTable);


function getDataGsheets(table){
	for (var i = 0; i < table.length; i++){
		gsjson({
			spreadsheetId: table[i].spreadsheetId,
		})
		.catch(function(err){
			console.log(err.message);
			console.log(err.stack);
		})
		.then(function(result){
			next(result, table);
			
		});
	}
}

function next(result, table){
	groupTable[curseur].output = reorganizeJson(result, table[curseur].keys, table[curseur].status);
	curseur ++;
	if(curseur === table.length){
		var fileJson = createJson(groupTable[0].output, groupTable[1].output);
		ecritureJson(fileJson, __dirname + '/public/marrainage.json');
	}
}

function reorganizeJson(data, keys, status){
	return data.map(function(item){
		var output = {};
		createId(output, item.horodateur, item.nom, item.prenom);
		addStatus(output, status);
		for(var k in keys){
			output[k] = item[keys[k]] || '';
			if(k === 'mailingList'){
				output[k] = booleanMailingList(item[keys[k]]);
			}
			if(k === 'map'){
				output[k] = booleanMap(item[keys[k]]);
			}
			if(k === 'email'){
				output.validEmail = validMail(item[keys[k]]);
			}
			if(k === 'telephone' && item[keys[k]]){
				output[k] = validPhone(item[keys[k]]);
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

function validMail(value){
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(value);
}
function validPhone(value){
	if (!value.startsWith('0')){
		value = '0'+ value ;
}
return value;
}

function createJson(array1, array2){
	var Json = {}
	Json.marrainage = array1.concat(array2);
	return Json ;
}

function ecritureJson(file, path){
	var stringJson= JSON.stringify(file);
	fs.writeFile(path ,stringJson, 'utf8', (err) => {
		if (err) throw err;
		console.log('It\'s saved!');
	});
}