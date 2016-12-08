var fs = require('fs');
var gsjson = require('google-spreadsheet-to-json');
var config = require('./config.js');
var md5 = require('md5');
var values = require('./values.js');

var curseur = 0;

/* Tableau regroupant les informations selon la spreadsheet appelée */
var groupTable = [
	{
1
var fs = require('fs');
2
var gsjson = require('google-spreadsheet-to-json');
3
var config = require('./config.js');
4
var md5 = require('md5');
5
var values = require('./values.js');
6
​
7
var curseur = 0;
8
​
9
/* Tableau regroupant les informations selon la spreadsheet appelée */
10
var groupTable = [
11
        {
12
                spreadsheetId: config.spreadsheetIdMarraines,
13
                status: "marraine",
14
                keys: values.marraines
15
        },
16
        {
17
                spreadsheetId: config.spreadsheetIdFilleules,
18
                status: "filleule",
19
                keys: values.filleules
20
        }
21
];
22
​
23
​
24
/* Appel de la fonction principale */
25
getDataGsheets(groupTable);
26
​
27
​
28
/* Extraction des spreadsheets grâce à une boucle et des promesses via la fonction next */
29
function getDataGsheets(table){
30
        for (var i = 0; i < table.length; i++){
31
                gsjson({
32
                        spreadsheetId: table[i].spreadsheetId,
33
                })
34
                .catch(function(err){
35
                        console.log(err.message);
36
                        console.log(err.stack);
37
                })
38
                .then(function(result){
39
                        next(result, table);
40
                        
41
                });
42
        }
43
}
44
​
45
/* Lorsqu'une spreadsheet a été extraite, on réorganise le fichier Json comme prédéfini dans les keys de values.js . 
46
Les valeurs undefined sont remplacées par des chaines de caractères vides, les oui/non sont remplacés par des booléens 
47
et la validité de l'email est vérifiée. */
48
function next(result, table){
49
        groupTable[curseur].output = reorganizeJson(result, table[curseur].keys, table[curseur].status);
50
        curseur ++;
51
        if(curseur === table.length){
52
                var fileJson = createJson(groupTable[0].output, groupTable[1].output);
53
                ecritureJson(fileJson, __dirname + '/public/marrainage.json');
54
        }
55
}
56
​
57
function reorganizeJson(data, keys, status){
58
        return data.map(function(item){
59
                var output = {};
60
                createId(output, item.horodateur, item.nom, item.prenom);
61
                addStatus(output, status);
62
                for(var k in keys){
63
                        output[k] = item[keys[k]] || '';
64
                        if(k === 'mailingList'){
65
                                output[k] = booleanMailingList(item[keys[k]]);
66
                        }
67
                        if(k === 'map'){
68
                                output[k] = booleanMap(item[keys[k]]);

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
	fs.writeFile(path,stringJson, 'utf8', (err) => {
		if (err) throw err;
		console.log('It\'s saved!');
	});
}
