const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

//RECUPERE TOUTES LES INFORMATIONS D'UN UTILISATEUR 
exports.userProfile = (req, res, next) => {
    User.userProfile(req.params.userId, (err, data) => {
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

/*//FONCTION DE CONNEXION
exports.login = (req,res,next) => {
  User.login(req.params.email, (err, data) => {
    if(err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "L'utilisateur n'existe pas"
        });
      } else {
        res.status(500).send({
          message: "Erreur"
        });
      }
    } else {
      bcrypt.compare(req.params.password, user.password)
      .then(valid =>{
        if(!valid){
          return res.status(401).json({ error : 'Mot de passe incorrect!'})
        }
        res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            { userId: user.id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' },
          )
        })
      })
      .catch(error => res.status(500).json({ error }));
    }
  });
};*/

/*
//FONCTION CREATION D'UN NOUVEL UTILISATEUR
exports.signup = (req, res) => {
    // Validation des entrees
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Cree un nouvel utilisateur
    const user = new User({
      email         : req.body.email,
      password      : bcrypt.hash(req.body.password, 10),
      lastname      : req.body.lastname,
      firstname     : req.body.firstname,
      department    : req.body.department
    });
  
    // Enregistre l'utilisateur dans la base de donnees
    User.create(user)
        .then(() => res.status(201).json({ message : 'L\'utilisateur a été créé !' }))
        .catch(error => res.status(400).json({ error }));
};

//FONCTION DE LOGIN
exports.login = (req,res,next) => {
    User.findByEmail({ userEmail : req.body.email })//on recherche l'email dans la base de données
    .then(user => {
        if (!user) {
            return res.status(401).json({ error : 'Utilisateur inconnu!'})
        }
        bcrypt.compare(req.body.password, user.password)// on compare les mots de passe
        .then(valid => {
            if(!valid){
                return res.status(401).json({ error : 'Mot de passe incorrect!'})
            }
            res.status(200).json({// on renvoie un token valable 24h
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' },
                )
            })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));


//RECUPERE UN UTILISATEUR AVEC SON ID
exports.findOneById = (req, res, next) => {
    User.findById(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "L'utilisateur n'existe pas"
          });
        } else {
          res.status(500).send({
            message: "Erreur"
          });
        }
      } else res.send(data);
    });
  };



//METTRE A JOUR LES INFORMATIONS D'UN UTILISATEUR 
exports.modifyProfile = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    User.updateById(
        req.params.userId,
        new User(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `L'utilisateur n'existe pas`
            });
            } else {
            res.status(500).send({
                message: "Erreur"
            });
            }
        } else res.send(data);
        }
    );
};

//SUPPRIMER UN UTILISATEUR
exports.deleteProfile = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "L'utilisateur n'existe pas"
          });
        } else {
          res.status(500).send({
            message: "Erreur"
          });
        }
      } else res.send({ message: "Utilisateur supprime" });
    });
  };
  */

/*Inscription d'un nouvel utilisateur
exports.signup = (req,res,next) => {
    //on récupère toutes les infos du formulaire d'inscription
        let email = req.body.email
        let password = req.body.password
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let department = req.body.department
        //on verifie si l'email existe deja dans la bdd
        if(Model.findAll({attributes: ['email']})){
            //si l'email existe dans la bdd, renvoie un message "Utilisateur existant" --> finished
            return res.status(401).json({ error : "L'utilisateur existe déjà" })
        }
        //sinon on supprime le faux id
        //delete req.body._id;
        //on hash le password
        bcrypt.hash(req.body.password, 10)
        //puis on enregistre les données dans la bdd
        .then(hash => {
            await User.create({ email: '${email}', password: '${hash}',  });
        })
            //INSERT INTO gp_users (email, password, lastname, firstname, department) VALUES ('${email}', '${hash}', '${lastname}', '${firstname}', '${department}', )
        //la réponse renvoie l'id du nouvel utilisateur
            //userId: user._id,
            //token: jwt.sign(
                //{ userId: user._id },
                //'RANDOM_TOKEN_SECRET',
                //{ expiresIn: '24h' },
        };

        exports.signup = (req,res,next) => {
            bcrypt.hash(req.body.password, 10)// on crypte le mot de passe
            .then(hash => {
                const user = new User ({ // on crée une nouvelle instance de la classe User
                    email : req.body.email,
                    password : hash
                });
                user.save()// on enregistre les données de l'utilisatuer dans la base de données
                    .then(() => res.status(201).json({ message : 'L\'utilisateur a été créé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    };

//Connexion d'un utilisateur existant
exports.login = (req,res,next) => {
    //on récupère toutes les infos du formulaire de connexion
        //let email = req.body.email
        //let password = req.body.password
        //on recherche les infos necessaire dans la bdd
    //on recherche l'email dans la bdd
        //User.findAll({
            where: {id: {$email}}
        });
            //si on ne le trouve pas, on renvoie le message 'Utilisateur inconnu" --> finished
            //si on trouve l'email dans la bdd
                //on recupere le hash enregistre et on compare les password
                    //let userPassword = SELECT password FROM gp_user WHERE email = '${email}'
                    //bcrypt.compare(password, userPassword)
                        //si ce n'est pas le password correct, on renvoie le message "Mot de passe incorrect" --> finished
                        //si le password est correct, la réponse renvoie un token valable 24h
                            //userId: user._id,
                            //token: jwt.sign(
                                //{ userId: user._id },
                                //'RANDOM_TOKEN_SECRET',
                                //{ expiresIn: '24h' },
};

//Affichage des données d'un utilisateur
exports.seeProfile = (req,res,next) => {
    //on récupere l'id de l'utilisateur
        //let userId = id
    //on récupere les données de l'utilisateur
        //SELECT * FROM gp_users WHERE users.id = '${userId}'
};

exports.modifyProfile = (req,res,next) => {
    //on recupere l'id de l'utilisateur
        //let userId = userId
    //on verifie s'il y a une image
        //si oui, on parse la requete
            //...JSON.parse(req.body.sauce),
            //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            //puis on enregistre le reste
        //si non, on enregistre directement le reste
            //UPDATE * FROM gp_users WHERE id = '${userId}'
};

//Suppression d'un utilisateur
exports.deleteProfile = (req,res,next) => {
    //on récupere l'id de l'utilisateur
        //let userId = id
    //on supprime les données de l'utilisateur
        //await User.destroy$({
            where: {
                email: `{$email}`
            }
        });
};*/

