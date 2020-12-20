const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

//FONCTION DE CRÉATION D'UN COMPTE UTILISATEUR (SIGNUP)
exports.signup = (req, res, next) => {
  let email     = req.body.email;
  let password  = req.body.password;
  let lastname  = req.body.lastname;
  let firstname = req.body.firstname;
  let department  = null;
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

/*//FONCTION DE CONNEXION (LOGIN)
exports.login = (req,res) => {
  let email     = req.body.email ? req.body.email : data.body.email;
  let password  = req.body.password ? req.body.password : data.body.password;
    User.findOneByEmail(email,(err, data) => {
      if (err) {
        return res.status(401).json({ error : 'Utilisateur inconnu!'})
      } else {
      bcrypt.compare(password, userPass )// on compare les mots de passe
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
      }
    })     
};*/

//RÉCUPERE TOUTES LES INFORMATIONS D'UN UTILISATEUR -> AFFICHER LE PROFIL
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




