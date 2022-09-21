Groupomanie | Openclassrooms P7 - Projet Fullstack
Implémentation fullstack d'un réseau social d'entreprise

Commencer
1- Pré requis
Vous aurez besoin d'avoir Node et npm installés localement sur votre machine.
Cloner ou télécharger ce référentiel
2- Installation du backend
Depuis le répertoire du serveur :

Supprimez l'extension .sauve du fichier .env et remplissez les champs DB_USERNAMEet DB_PASSWORDavec vos informations de connexion MySQL.
Exécutez npm i la commande pour installer les dépendances du backend.
Création de la base de données groupomania_dev.
Importer la base de données avec le fichier groupomania_dev (1) fichier source SQL.
Exécutez npm run db-init la commande pour initialiser la base de données MySql et la remplir avec des données fictives.
Exécutez npm startla commande pour lancer l'API
À ce stade, le serveur devrait fonctionner sur le port 8080 et les messages suivants devraient s'afficher dans votre terminal :

Listening on port 8080
...
connected to database...
3- Installation frontale
Depuis le répertoire client :

Exécutez npm installla commande pour installer les dépendances frontales.
Exécutez npm startpour lancer le serveur frontal en mode développement.
À ce stade, l'application devrait démarrer automatiquement dans votre navigateur Web.

4- Comptes démo (admin & modérateur)
Si vous souhaitez vous connecter en tant qu'administrateur ou modérateur, veuillez utiliser les comptes de démonstration.
Les détails de connexion sont donnés dans le fichier .env dans le répertoire du serveur .

Aperçu du projet
Construit avec
Backend

Node JS / Express
MySQL / Sequelize


frontend
Réact
Bootstrap / React Boostrap / Composants stylés
Compétences évaluées
✔️Authentifier et gérer la session utilisateur
✔️Stocker et gérer des données avec SQL
✔️Mise en œuvre du stockage de données sécurisé SQL
✔️Envoi de contenu personnalisé au client Web
✔️Utilisation d'un framework frontal de votre choix


