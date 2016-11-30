
var gsjson = require('google-spreadsheet-to-json');

gsjson({
	spreadsheetId:'1yExh1Uv0aVD8j9J_IJg8VkYy6JTp42njCESJWUjM900',
})
.then(function(result){
	console.log(result.length);
	console.log(result);
})
.catch(function(err){
	console.log(err.message);
	console.log(err.stack);
});

// var client ID = 765119466539-183q38tum9skq60pk177bon8u8kr2gtp.apps.googleusercontent.com
// var client secret = flCCrxweg1c22PnwjG5GP3_As
