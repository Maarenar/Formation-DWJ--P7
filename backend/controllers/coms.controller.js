const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql");
const User = require('../models/Coms.models');

/*//PUBLIER UN COMMENTAIRE
exports.createComment = (req, res) => {
  };

//AFFICHER L'UTILISATEUR QUI A PUBLIE LE COMMENTAIRE
exports.getCommentAuthor = (req, res) => {
};

//MODIFIER UN COMMENTAIRE -> AUTHOR ONLY
exports.updateComment = (req, res) => {
};

//SUPPRIMER UN COMMENTAIRE -> AUTHOR AND ADMIN ONLY
exports.deleteComment = (req, res) => {
};

module.exports = router;*/