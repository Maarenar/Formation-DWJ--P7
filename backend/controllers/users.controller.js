const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

//RECUPERE TOUTES LES INFORMATIONS D'UN UTILISATEUR 
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

//FONCTION DE LOGIN
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


/*
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

Inscription d'un nouvel utilisateur
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
*/

