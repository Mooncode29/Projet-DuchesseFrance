var fs = require('fs');

var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var date = now.getDate();
var minutes = now.getMinutes();


var filename = __dirname + '/backup/' + year + '-' + month + '-' + date + '-' + minutes + '.json.bak'


fs.createReadStream(__dirname + '/public/marrainage.json').pipe(fs.createWriteStream(filename));

fs.readdir(__dirname + '/backup', function(err, files){
	if (err){
		return;
	}
	if (files.length > 7){
		files.forEach(function(f){
			console.log('File : ' + f);
		});
	}
});