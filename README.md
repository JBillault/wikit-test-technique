# wikit-test-technique

Ce test technique a été réalisé avec la bibliothèque REACT pour le front avec Tailwind pour le CSS. La partie backend a été réalisé avec NODE, EXPRESS et MYSQL.

# Démarer le serveur back

1. Cloner le repo depuis GitHub.
2. Se rendre dans le dossier `backend`.
3. Utiliser la commande `npm install` pour installer toutes les dépendances.
4. Utiliser la commande `cp .env.sample .env`(copie le ficher .env.sample et renomme la copie .env).
5. Completer les variables `DB_USER` et `DB_PASSWORD` avec vos identifiants Mysql. Modifier la variable `DB_PORT` en 3309 si vous passez par Docker.
6. Utilser la commande `npm run resetDB` afin de créer la base de donnée.
7. Lancer le serveur avec la commande `npm start`.

# Démarer le serveur front

1. Ouvrir un nouveau terminal.
2. Se rendre dans le dossier `frontend`.
3. Utiliser la commande `npm install`pour installer toutes les dépendances.
4. Utiliser la commande `npm start`pour lancer le serveur.
5. Se rendre sur le lien `localhost:300?`.

## Pour aller plus loin

Pour aller plus loin:

1. Il aurait été intéressant de mettre en place un système de login, en créant une second table liée (`username`, `password`) dans la base de donnée et mettre en place un système de token (jwt).
2. Il aurait fallu mettre en place un système de pagination lors de l'affichage de la liste de tweet. Réalisable en ajoutant les commandes `LIMIT`et `OFFSET` dans les commandes SQL.
3. Il est aussi possible de mettre en place un chat à l'aide de websocket (socket.io).
