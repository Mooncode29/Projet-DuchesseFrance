# Projet-DuchesseFrance

Ce programme vise à récupérer les informations de deux Google SpreadSheets existantes et de convertir les informations de ces Sheets en un seul et même fichier Json. Ce fichier Json sera généré plusieurs fois dans la journée et mis à disposition pour alimenter le nouveau site de Marrainage de Duchess France.

***

## Description

Le fichier server.js sert à lancer le serveur et mettre à disposition le fichier Json au cas où les fichiers ne seraient pas hébergés sur le même serveur que le site de Marrainage.

Le fichier script_publique.js contient le programme de conversion des Google SpreadSheets en fichier Json ainsi que l'écriture du fichier Json dans un dossier.

Le fichier values.js contient les références des clés utilisées pour la réorganisation des informations.

Le fichier de configuration config.example.js contient la structure du fichier config à recréer.

Le fichier backup.js

## Mise en place

1. Installer les dépendances nécessaires en tapant `npm init` dans le terminal du serveur.

2. Créer un fichier config.js à la racine et lui attribuer les deux différentes Id des SpreadSheets filleules et marraines à utiliser. Ce fichier sera une copie de config.example.js avec l'ajout des ID. Les SpreadSheets doivent êtres publiques (utiliser Publish to the Web pour ce faire).

3. Créer un dossier public à la racine pour pouvoir y stocker le fichier Json.

4. Créer un dossier backup à la racine pour y stocker les fichiers de sauvegarde.

5. Utiliser crontab configuré comme suivant pour lancer script_publique.js :
Aller dans le terminal 
taper crontab -e pour éditer la crontab
indiquer les moments d'execution du script  sur la ligne m h  dom mon dow   command

m : minute (0-59),
h : heure (0-23),
dom : jour du mois(1-31),
mon : mois(1-12),
dow : jour de la semaine(0-6, 0 étant le dimanche)
command : indique la commande à lancer

exemple : nous avons lancé avec node le script situé dans le répértoire suivant. Nous l'avons programmé toutes les minutes.
* signifie à chaque unité de temps,

* * * * * node /home/simplon/exos/projet_dc1/script_publique.js

taper ctrl + 0 : pour écrire le fichier
taper sur Entrée
Quitter 
la ligne suivante s'affiche : crontab: installing new crontab
votre cron est installé

Voici deux autres principaux paramètres à connaître: 
crontab -l : pour afficher la crontab actuelle
crontab -r : pour supprimer la crontab. Attention , la suppression est immédiate et sans confirmation.

6. Utiliser crontab configuré comme suivant pour lancer backup.js : 


##Attention

En cas de modification des formulaires de base, il faut veiller à ce que les valeurs du fichier values.js soient bien modifiées elles aussi et que l'ID de la SpreadSheet correspondante soit correct dans le fichier de configuration (config.js).