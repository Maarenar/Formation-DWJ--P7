Projet 7 - Création d'un réseau social d'entreprise

FRONTEND
Racine : http://localhost:8888/site/

BACKEND
Exécuter npm install dans le répertoire backend/

DATABASE
Créer une bdd "groupomania" et importer le fichier groupomania.sql

Dupliquer le fichier backend/.env.example et le sauvegarder en .env
SECRET : clé secrète pour l'encodage du token d'authentification
Informations de connexion à la bdd :
HOST
USER
PASSWORD
DB
PORT

REMARQUES
Un utilisateur est créé sans précision sur son statut admin/non admin. La colonne admin de la table gp_users doit avoir une valeur par défaut de 0.
Pour qu'un utilisateur puisse avoir les droits de modérateur, la valeur admin doit être passée à 1.
Une reconnexion est nécéssaire pour mettre à jour la session utilisateur avec le nouveau statut.

