var fs = require('fs');

var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1; //Numéro du mois qui commence à l'indice 0
var date = now.getDate();
var minutes = now.getMinutes();

var backupPath = __dirname + '/backup/';


var filename = backupPath + year + addZero(month) + addZero(date) + addZero(minutes) + '.json.bak'


fs.createReadStream(__dirname + '/public/marrainage.json').pipe(fs.createWriteStream(filename));

/* Vérification du nombres de fichier et suppression du plus vieux si plus de 7 fichiers */
fs.readdir(backupPath, function(err, files){
	if (err){
		return;
	}
	if (files.length > 7){
		var older = files[0];
		for (var i = 0 ; i < files.length ; i++){
			if (files[i] < older){
				older = files[i];
			}
		}
		fs.unlink(backupPath + older);
	}
});

function addZero(value){
	if (value < 10){
		return '0' + value;
	}
	return value;
}