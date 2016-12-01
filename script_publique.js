var fs = require('fs');
var gsjson = require('google-spreadsheet-to-json');
var filleulesJsonOrigin ;
var filleulesArray ;
var filleulesJson ;
var config = require('./config.js');
var values = require('./values.js');

gsjson({
	spreadsheetId:config.spreadsheetId,
})
.then(function(result){
	filleulesJsonOrigin = result;
	reorganizeJson();
	filleulesJson = createJson(filleulesArray, "filleules");
	console.log(filleulesJson);
	ecritureJson ();
})
.catch(function(err){
	console.log(err.message);
	console.log(err.stack);
});

function reorganizeJson(){
	filleulesArray = filleulesJsonOrigin.map(function(item, i){
		var object = {
			id: i+1,
			nom: item.nom,
			prenom: item["prénom"],
			email: item.email,
			societe: item["société/Ecole"],
			experience: item["annéesD\'expérienceDansLeDomaineInformatique/AnnéesD\'étudesPourLesÉtudiants"],
			profession: item["profession/SpécialitéDansL\'école"],
			specialite: item["spécialités/domaineTechnique(web,Mobile,Data,Infra,Ops,…?)"],
			ville: item["région/ville"],
			telephone: item["noTéléphone"],
			twitter: item.urlTwitter,
			linkedin: item.urlLinkedin,
			facebook: item.urlFacebook,
			mailingList: item["etesVousAbonnéeÀLaMailingListDuchess?"],
			description: item["quelquesMotsPourVousPrésenterAuxMarraines,QueRecherchezVous?"],
			modeInteraction: item["avezVousUnModeD\'interactionPréféré?"],
			map: item["acceptezVousD\'êtreVisibleSurLaCarteDeLocalisationDesDuchesses?"]
		}
		return object;
	});
	addBoolean(filleulesArray);
	transformUndefined(filleulesArray);
}

function createJson(array, group){
	var Json = {}
	Json[group] = array;
	return Json ;
}
function addBoolean(array){
	array = array.map(function(item){
		if(item.map === "Oui"){
			item.map = true;
		}
		else {
			item.map = false;
		}

		if(item.mailingList === "Oui"){
			item.mailingList = true;
		}
		else {
			item.mailingList = false;
		}
	});
}

function transformUndefined(array){
	array = array.map(function(item){
		for (var key in item){
			if(item[key] === undefined){
				item[key] = "";
			}
		}
	})
}

function ecritureJson(){
	var stringJson= JSON.stringify(filleulesJson);
	fs.writeFile('filleules.json',stringJson, (err) => {
		if (err) throw err;
		console.log('It\'s saved!');
	});
}

// var client ID = 765119466539-183q38tum9skq60pk177bon8u8kr2gtp.apps.googleusercontent.com
// var client secret = flCCrxweg1c22PnwjG5GP3_A