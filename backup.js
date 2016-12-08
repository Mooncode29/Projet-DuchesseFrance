var fs = require('fs');

var now = new Date();""

var filename = __dirname + '/backup/' + now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay() + '-' + now.getMinutes() + '.json.bak'

fs.createReadStream(__dirname + '/public/marrainage.json').pipe(fs.createWriteStream(filename));

