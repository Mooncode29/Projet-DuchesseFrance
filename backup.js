var fs = require('fs');
// création des fichiers

// function read(operation){	
// 	fs.readFile('public/marrainage.json','utf8',function(err,data){
// 		if (err){
// 			console.log(err);
// 		}
// 		operation(data)
// 	});

// } 
// function write(content){
// 	fs.writeFile('backup/backup1_marrainage.json',content,'utf8', (err,data) => {
// 		if (err) {
// 			console.log("erreur");
// 		}	
// 	});
// }
// read(write);

var seconde=1000;
var minute = 60 * seconde;
var heure = 60 * minute;
var jour = 24 *heure ;
var day = new Date();
console.log(day);
var creer=fs.createReadStream('public/marrainage.json').pipe(fs.createWriteStream('backup/backup_marrainage.json'+1));





