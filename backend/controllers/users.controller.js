const bcrypt = require('bcrypt');
const { urlencoded } = require('body-parser');
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
    if(user){
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
      let user_id = user[0].userId;
      let userPassword = user[0].password;
      let admin = user[0].admin;
      if(!user){
        return res.status(401).json({ error : 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(password, userPassword)
        .then(valid => {
          if(!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect'});
          }
          res.status(200).json({
            userId : user_id,
            admin : admin,
            token: jwt.sign(
              { userId: user[0].userId },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error : 'Erreur du serveur' }));
    })
    .catch(error => res.status(500).json({ error}));
};

  

//RÉCUPERE TOUTES LES INFORMATIONS D'UN UTILISATEUR -> AFFICHER LE PROFIL
exports.userProfile = (req, res, next) => {
  let userId = req.body.userId;
    User.findOneById(userId)
    .then(userData => {
      let user = userData[0];
      let firstName = user.firstname;
      let lastName = user.lastname;
      return res.status(200).json({
      "firstname": firstName,
      "lastname": lastName,
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
  if(req.body.password != ''){
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
      User.editProfileAndPassword([email,hash,lastname,firstname,department, userId])
      .then( response => {
        console.log(response);
        return res.status(203).json("Information mises à jour ");
      })
      .catch(error => res.status(500).json({ error : 'Erreur du serveur 1' }));
    })
    .catch(error => res.status(500).json({ error : 'Erreur du serveur 2' }))
  } else {
    User.editProfile([email,lastname,firstname,department, userId])
    .then(response => {
      return res.status(203).json("Information mises à jour ");
    })
    .catch(error => res.status(500).json({ error : 'Erreur du serveur 3' }))
  }
}
