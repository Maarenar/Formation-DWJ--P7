const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

//FONCTION DE CRÉATION D'UN COMPTE UTILISATEUR (SIGNUP)
exports.signup = (req, res, next) => {
  let email       = req.body.email;
  let password    = req.body.password;
  let lastname    = req.body.lastname;
  let firstname   = req.body.firstname;
  let department  = '';
  if (!req.body.department){
    department = '';
  }else{
    department = req.body.department;
  }
  //vérification que tous les champs sont remplis
  if(!email || !password || !lastname || !firstname){
    return res.status(400).send({ message: "Tous les champs doivent être remplis" });
  }
  //vérification que l'email n'est pas deja utilisé 
  User.findOneByEmail(email, (err, data) => { 
    if(err){
        return res.status(500).json({ error : 'Erreur du serveur'})
    } else if(data === 1){
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
            return res.status(201).json({"Utilisateur" : data});
          }
        });
      })
      .catch(error => res.status(500).json({ error }));
    }
  }) 
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
  let userId = req.params.userId;
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
exports.editProfile = (req,res,next) => {
  let userId      = req.params.userId;
  let email       = req.body.email;
  let lastname    = req.body.lastname;
  let firstname   = req.body.firstname;
  let department  = '';
  User.editProfile([email,lastname,firstname,department, userId], (err, data)=>{
    if(err){
      console.log(err);
      return res.status(500).json({ error : 'Erreur du serveur'});
    } else {
      console.log(data);
      return res.status(200).json({"Compte modifié" : data});
    }
  });
}




