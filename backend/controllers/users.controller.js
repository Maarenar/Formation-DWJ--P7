const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

//FONCTION DE CRÉATION D'UN COMPTE UTILISATEUR (SIGNUP)
exports.signup = (req, res) => {
  //vérification que les champs ne sont pas vide
  if(!req.body){
    res.status(400).send({ message: "Tous les champs doivent être remplis" });
    return;
  }
  //vérification que tous les champs sont remplis
  if(!req.body.email || !req.body.password || !req.body.lastname || !req.body.firstname){
    res.status(400).send({ message: "Tous les champs doivent être remplis" });
    return;
  }
  //vérification que l'email n'est pas deja utilisé 
  let email = req.body.email;
  User.findOneByEmail(email, (err, data) => { 
    if(err){
      if(err.kind === "not_found"){
        bcrypt.hash(req.body.password, 10) 
        .then(hash => {
          const user = new User({
            email : req.body.email,
            password : hash,
            lastname : req.body.lastname,
            firstname : req.body.firstname,
            department : req.body.department
          });
          User.create(user, (err, data) =>{
            if(err){
              res.status(500).send({ message: err.message || "Some error occurred while creating the Customer." });
            } else { 
              res.send(data);
            }
          })
        }) 
        .catch(error => res.status(500).json({ message: error.message }));
      } else {
        res.status(403).send({ message: "Erreur" });
        return;
      }
    } else {
      res.status(400).send({ message : "Un compte existe déjà avec cet email" });
      return;
    }
  })
};

//FONCTION DE CONNEXION (LOGIN)
exports.login = (req,res) => {
  User.findOneByEmail({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          userId: user._id,
          token: 'TOKEN'
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

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



/*//LOGIN
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
};*/

/*DELETE ACCOUNT
    // => findOneById
    // => delete * where if
*/
  //recupere email et password
  //enregistre : insert into 

/*MODIFY ACCOUNT INFORMATION
  //recupere les infos a modifier
  // => findOneById
  // => enregistre : insert into where id 
*/



