var fs = require('fs');
// création des fichiers

function read(operation){	
	fs.readFile('public/marrainage.json','utf8',function(err,data){
		if (err){
			console.log(err);
		}
		operation(data)
	});

} 
function backup1(content){
	fs.writeFile('backup/backup1_marrainage.json',content,'utf8', (err,data) => {
		if (err) {
			console.log("erreur");
		}	
	});
}

function backUp2(content){
	fs.writeFile('backup/backup2_marrainage.json',content,'utf8', (err,data) => {
		if (err) {
			console.log("erreur");
		}	
	});
}

function backUp3(content){
	fs.writeFile('backup/backup3_marrainage.json',content,'utf8', (err,data) => {
		if (err) {
			console.log("erreur");
		}	
	});
}

function backUp4(content){
	fs.writeFile('backup/backup4_marrainage.json',content,'utf8', (err,data) => {
		if (err) {
			console.log("erreur");
		}	
	});
}

function backUp5(content){
	fs.writeFile('backup/backup5_marrainage.json',content,'utf8', (err,data) => {
		if (err) {
			console.log("erreur");
		}	
	});
}

;

setInterval(read(backup1),10000);
setInterval(read(backUp2),12000);
setInterval(read(backUp3),13000);
setInterval(read(backUp4),14000);
setInterval(read(backUp5),15000);