var fs = require('fs');
var gsjson = require('google-spreadsheet-to-json');
var config = require('./config.js');
var md5 = require('md5');
var values = require('./values.js');

var curseur = 0;

/* Tableau regroupant les informations selon la spreadsheet appelée */
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


/* Appel de la fonction principale */
getDataGsheets(groupTable);


/* Extraction des spreadsheets grâce à une boucle et des promesses via la fonction next */
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

/* Lorsqu'une spreadsheet a été extraite, on réorganise le fichier Json comme prédéfini dans les keys de values.js . 
Les valeurs undefined sont remplacées par des chaines de caractères vides, les oui/non sont remplacés par des booléens 
et la validité de l'email est vérifiée. */
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
		}
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