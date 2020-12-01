const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

//RECUPERE TOUTES LES INFORMATIONS D'UN UTILISATEUR -> AFFICHER LE PROFIL
exports.userProfile = (req, res, next) => {
    User.findOneById(req.params.userId, (err, data) => {
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

//LOGIN
exports.login = (req,res,next) => {
    User.findOneByEmail({ email : req.body.email })//on recherche l'email dans la base de données
    .then(user => {
        if (!user) {
            return res.status(401).json({ error : 'Utilisateur inconnu!'})
        }
        bcrypt.compare(req.body.password, password)// on compare les mots de passe
        .then(valid => {
            if(!valid){
                return res.status(401).json({ error : 'Mot de passe incorrect!'})
            }
            res.status(200).json({// on renvoie un token valable 24h
                userId: userId,
                token: jwt.sign(
                    { userId: userId },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }, 
                )
            })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//DELETE ACCOUNT
    // => findOneById
    // => delete * where if

//SIGNUP
  //recupere email et password
  //enregistre : insert into 

//MODIFY ACCOUNT INFORMATION
  //recupere les infos a modifier
  // => findOneById
  // => enregistre : insert into where id 

//DELETE ACCOUNT
  // => findOneById
  // => delete * where if
  


