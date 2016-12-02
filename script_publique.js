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
	filleulesArray = reorganizeJson(result, values);
	filleulesJson = createJson(filleulesArray, "filleules");
	ecritureJson ();
})
.catch(function(err){
	console.log(err.message);
	console.log(err.stack);
});

function reorganizeJson(data, keys){
	return data.map(function(item){
		var output = {};
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
