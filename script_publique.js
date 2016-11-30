
var gsjson = require('google-spreadsheet-to-json');


var filleulesJsonOrigin ;

gsjson({
	spreadsheetId:'1yExh1Uv0aVD8j9J_IJg8VkYy6JTp42njCESJWUjM900',
})
.then(function(result){
	console.log(result.length);
	filleulesJsonOrigin = result;
	reorganizeJson();
	// console.log(result);
})
.catch(function(err){
	console.log(err.message);
	console.log(err.stack);
});


function reorganizeJson(){
	var filleulesArray = filleulesJsonOrigin.map(function(item, i){
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
	console.log(filleulesArray);
}

// var client ID = 765119466539-183q38tum9skq60pk177bon8u8kr2gtp.apps.googleusercontent.com
// var client secret = flCCrxweg1c22PnwjG5GP3_As
