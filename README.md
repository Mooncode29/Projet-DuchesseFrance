# Projet-DuchesseFrance

Ce programme a été développé au bout de trois mois de formation à la fabrique de développeurs Simplon Toulouse par trois membres de la promotion #2.   
Il vise à récupérer les informations de deux Google SpreadSheets existantes et de convertir les informations de ces Sheets en un seul et même fichier Json. Ce fichier Json sera généré plusieurs fois dans la journée et mis à disposition pour alimenter le nouveau site de Marrainage de Duchess France.

***

## Description

Le fichier server.js sert à lancer le serveur et mettre à disposition le fichier Json au cas où les fichiers ne seraient pas hébergés sur le même serveur que le site de Marrainage.

Le fichier generateJson.js contient le programme de conversion des Google SpreadSheets en fichier Json ainsi que l'écriture du fichier Json dans un dossier.

Le fichier values.js contient les références des clés utilisées pour la réorganisation des informations.

Le fichier de configuration config.example.js contient la structure du fichier config à recréer.

Le fichier backup.js contient le script à éxécuter une fois par jour pour faire une sauvegarde du fichier généré.

## Mise en place

1. Il faut préalablement mettre les Googlesheets en mode publique : cliquer sur  l'onglet `Fichier` puis `Publier sur le web`.

2. Faire  `git clone git@github.com:Mooncode29/Projet-DuchesseFrance.git`.

3. Taper `npm init` puis `npm install` dans le terminal du serveur.

4. `mkdir backup` puis `mkdir public`

5. `cp example.config.js config.js` puis remplir dans config.js les ID de SpreadSheets correspondant. 

6. Toujours dans le terminal du serveur  
`crontab -e` pour ouvrir l'édition de crontab  
`2` pour choisir bin/nano  
Tout en bas de l'édition du crontab, `*/5 * * * * node [Chemin absolu du fichier]` pour lancher le script toutes les 5 minutes. Sauvegarder avec Ctrl + O puis exit avec Ctrl + X.  
  
Pour vérifier le crontab, `crontab -l`  
Pour supprimer le crontab, `crontab -r` . Attention, la suppression est immédiate et sans confirmation.  
  
  La syntaxe de crontab `m h dom mon dow command` correspond à ce qui suit :
+ m : minute (0-59)
+ h : heure (0-23)
+ dom : jour du mois(1-31)
+ mon : mois(1-12)
+ dow : jour de la semaine(0-6, 0 étant le dimanche)
+ command : indique la commande à lancer

7. Lancer le crontab pour backup.js  
`crontab -e` puis aller à la ligne  
`00 4 * * * node [chemin absolu du fichier]` pour lancer le script tous les jours à 4h.


## Attention

En cas de modification des formulaires de base, il faut veiller à ce que les valeurs du fichier values.js soient bien modifiées elles aussi et que l'ID de la SpreadSheet correspondante soit correct dans le fichier de configuration (config.js).

## Auteurs
+ [Irène Ravelonarivo](https://github.com/Mooncode29)
+ [Juliane Blier](https://github.com/Tactless7)
+ [Philippe Cécile](https://github.com/Cphil31) 