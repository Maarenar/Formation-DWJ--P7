const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

//FONCTION DE CRÉATION D'UN COMPTE UTILISATEUR (SIGNUP)
exports.signup = (req, res, next) => {
  let email       = req.body.email;
  let password    = req.body.password;
  let lastname    = req.body.lastname;
  let firstname   = req.body.firstname;
  let department  = req.body.department ? req.body.department : '';
  
  //vérification que tous les champs sont remplis
  if(!email || !password || !lastname || !firstname){
    return res.status(400).send({ message: "Tous les champs doivent être remplis"});
  }
  //vérification que l'email n'est pas déjà utilisé 
  User.findOneByEmail(email)
  .then(user => {
    if(!user){
      bcrypt.hash(password, 10)
      .then(hash => {
        const newUser = new User({
          email : email,
          password : hash,
          lastname : lastname,
          firstname : firstname,
          department : department
        });
        User.create(newUser)
        .then(user_id => {
          res.status(200).json({
            userId: user_id,
            token: jwt.sign(
              { userId: user_id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
          })
          .catch(error => res.status(500).json({ error : 'Erreur du serveur'}))
      })
    } else {
      res.status(500).json({ error : 'L\'utilisateur existe déjà' })
    }
  })
  .catch(error => res.status(500).json({ error }));  
};

//FONCTION DE LOGIN
exports.login = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOneByEmail(email)
    .then(user => {
      if(!user){
        return res.status(401).json({ error : 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(password, user[0].password)
        .then(valid => {
          if(!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            token: jwt.sign(
              { userId: user[0].userId },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error : 'Erreur du serveur 1' }));
    })
    .catch(error => res.status(500).json({ error}));
};

  

//RÉCUPERE TOUTES LES INFORMATIONS D'UN UTILISATEUR -> AFFICHER LE PROFIL
exports.userProfile = (req, res, next) => {
  let userId = req.params.userId;
    User.findOneById(userId)
    .then(userData => {
      let user = userData[0];
      let userName = user.firstname +  ' ' +user.lastname;
      return res.status(200).json({
      "name": userName,
      "email":user.email,
      "department":user.department});
    })
    .catch(error => res.status(500).json({ error : 'Erreur du serveur' })); 
};

//SUPPRIME UN COMPTE UTILISATEUR
exports.deleteProfile = (req, res, next) => {
  let userId = req.body.userId;
  User.deleteProfile(userId)
  .then( response =>{
    return res.status(200).json({"Compte supprimé" : response});
  })
  .catch(error => res.status(500).json({ error : 'Erreur du serveur' })); 
}

//MODIFIER UN COMPTE UTILISATEUR
exports.editProfile = (req,res) => {
  let userId      = req.body.userId;
  let email       = req.body.email;
  let lastname    = req.body.lastname;
  let firstname   = req.body.firstname;
  let department  = req.body.department ? req.body.department : '';

  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
    User.editProfile([email,hash,lastname,firstname,department, userId])
    .then( response => {
      return res.status(203).json({"Information mises à jour " : response });
    })
    .catch(error => res.status(500).json({ error : 'Erreur du serveur' }));
  });
}
