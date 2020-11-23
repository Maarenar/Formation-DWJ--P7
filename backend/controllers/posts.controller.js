const Post = require('../models/Posts.models');

/*//PUBLIER UN POST
exports.createPost = (req, res) => {
  };*/

/*//AFFICHER TOUS LES POSTS
exports.getAllPost = (req, res, next) => {
  
};*/

//AFFICHER UN POST
exports.getOnePost = (req, res, next) => {
    Post.getOnePost(req.params.postId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Post inexistant"
          });
        } else {
          res.status(500).send({
            message: "erreur"
          });
        }
      } else res.send(data);
    });
};


/*//AFFICHER L'UTILISATEUR QUI A PUBLIE LE POST
exports.getPostAuthor = (req, res) => {
};*/

/*//AFFICHER LE NOMBRE DE COMMENTAIRES D'UN POST
exports.numberOfComments = (req, res) => {
};

//AFFICHER LES COMMENTAIRES D'UN POST
exports.getPostComments = (req, res) => {
};

//MODIFIER UN POST -> AUTHOR ONLY
exports.updatePost = (req, res) => {
};

//SUPPRIMER UN POST -> AUTHOR AND ADMIN ONLY
exports.deletePost = (req, res) => {
};*/
