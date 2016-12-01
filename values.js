var mapping = {
	nom : "nom",
	prenom:"prénom",
	email: "email",
	societe:"société/Ecole",
	experience:"annéesD\'expérienceDansLeDomaineInformatique/AnnéesD\'étudesPourLesÉtudiants",
	profession:"profession/SpécialitéDansL\'école",
	specialite:"spécialités/domaineTechnique(web,Mobile,Data,Infra,Ops,…?)",
	ville:"région/ville",
	telephone:"noTéléphone",
	twitter:"urlTwitter",
	linkedin:"urlLinkedin",
	facebook: "urlFacebook",
	mailingList:"etesVousAbonnéeÀLaMailingListDuchess?",
	description:"quelquesMotsPourVousPrésenterAuxMarraines,QueRecherchezVous?",
	modeInteraction:"avezVousUnModeD\'interactionPréféré?",
	map:"acceptezVousD\'êtreVisibleSurLaCarteDeLocalisationDesDuchesses?"
};

module.exports = function(val){
	return mapping[val]
};