const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql");
const User = require('../models/Posts.models');

/*//PUBLIER UN POST
exports.createPost = (req, res) => {
  };

//AFFICHER TOUS LES POSTS
exports.getAllPosts = (req, res) => {
};

//AFFICHER UN POST
exports.getOnePost = (req, res) => {
};

//AFFICHER L'UTILISATEUR QUI A PUBLIE LE POST
exports.getPostAuthor = (req, res) => {
};

//AFFICHER LE NOMBRE DE COMMENTAIRES D'UN POST
exports.numberOfComments = (req, res) => {
};

//AFFICHER LES COMMENTAIRES D'UN POST
exports.getPostComments = (req, res) => {
};

//MODIFIER UN POST -> AUTHOR ONLY
exports.updatePost = (req, res) => {
};

//SUPPRIMER UN POST -> AUTHOR AND ADMIN ONLY
exports.deletePost = (req, res) => {
};

module.exports = router;*/