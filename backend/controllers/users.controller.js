const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

//RECUPERE TOUTES LES INFORMATIONS D'UN UTILISATEUR 
exports.findOneById = (req, res, next) => {
    User.findById(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "L'utilisateur n'existe pas"
          });
        } else {
          res.status(500).send({
            message: "erreur"
          });
        }
      } else res.send(data);
    });
};