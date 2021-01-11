const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

//FONCTION DE CRÉATION D'UN COMPTE UTILISATEUR (SIGNUP)
exports.signup = (req, res, next) => {
  let form        = req.body;
  let email       = req.body.email;
  let password    = req.body.password;
  let lastname    = req.body.lastname;
  let firstname   = req.body.firstname;
  let department  = req.body.department ? req.body.department : '';
  
  //vérification que tous les champs sont remplis
  if(!email || !password || !lastname || !firstname){
    return res.status(400).send({ message: "Tous les champs doivent être remplis", form: `${form}`, email : `${email}`});
  }
  //vérification que l'email n'est pas déjà utilisé 
  User.findOneByEmail(email, (err, data) => { 
    if(err){
        return res.status(500).json({ error : 'Erreur du serveur'})
    } else if(data > 0){
      return res.status(409).json({error : 'L\'utilisateur existe déjà'})
    } else {
      bcrypt.hash(password, 10)
      .then(hash=>{
        const newUser = new User({
          email : email,
          password : hash,
          lastname : lastname,
          firstname : firstname,
          department : department
        });
        User.create(newUser, (err,data)=>{
          if(err){
            return res.status(500).json({ error : 'Erreur du serveur'});
          } else {
            user_Id = data;
            return res.status(201).json({
              token: jwt.sign(
                { userId: user_Id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              ),

            });
          }
        });
      })
      .catch(error => res.status(500).json({ error }));
    }
  }) 
};

//FONCTION DE LOGIN
exports.login = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOneByEmail(email, (err,data) => {
    if (err) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    } else {
      let userPassword = data[0].password;
      let user_Id = data[0].userId;
      console.log(userPassword, user_Id);
      bcrypt.compare(password, userPassword)
      .then(data => {
        if (!data) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          token: jwt.sign(
            { userId: user_Id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        });
      })
      .catch(error => console.log(error));
    }
  }); 
};

//RÉCUPERE TOUTES LES INFORMATIONS D'UN UTILISATEUR -> AFFICHER LE PROFIL
exports.userProfile = (req, res, next) => {
  let userId = req.params.userId;
    User.findOneById(userId, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error : 'Erreur du serveur'});
        } else {
          console.log(data);
          return res.status(200).json({"Utilisateur" : data});
        } 
    });
};

//SUPPRIME UN COMPTE UTILISATEUR
exports.deleteProfile = (req, res, next) => {
  let userId = req.body.userId;
  User.deleteProfile(userId, (err, data) =>{
    if(err){
      console.log(err);
      return res.status(500).json({ error : 'Erreur du serveur'});
    } else {
      console.log(data);
      return res.status(200).json({"Compte supprimé" : data});
    }
  });
}

//MODIFIER UN COMPTE UTILISATEUR
exports.editProfile = (req,res) => {
  let userId      = req.body.userId;
  let email       = req.body.email;
  let lastname    = req.body.lastname;
  let firstname   = req.body.firstname;
  let department  = req.body.department ? req.body.department : '';

  bcrypt.hash(req.body.password, 10)
  .then(hash=>{
    User.editProfile([email,hash,lastname,firstname,department, userId], (err, data) =>{
      if(err){
        return res.status(500).json({ error : 'Erreur du serveur'});
      } else {
        return res.status(203).json("Information mises à jour ");
      }
    });
  });
}
