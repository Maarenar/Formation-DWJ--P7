const { getOnePost } = require('../models/Posts.models');
const Post = require('../models/Posts.models');

//AFFICHER UN POST AVEC : NOM ET PRENOM DE L'AUTEUR, CONTENU DU POST, COMMENTAIRE : CONTENU + NOM ET PRENOM DE L'AUTEUR
exports.getOnePost = (req, res, next) => {
  let postId = req.params.postId;
  Post.getOnePost(postId, (err, data) => {
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
    } else console.log(data);
  });

  Post.getAuthorName(postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Auteur inexistant"
        });
      } else {
        res.status(500).send({
          message: "erreur"
        });
      } 
    } else console.log(data);
  });

  Post.getPostComments(postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Commentaire inexistant"
        });
      } else {
        res.status(500).send({
          message: "erreur"
        });
      }
    } else console.log(data);
  });
};

/*//AFFICHER TOUS LES POSTS AVEC : NOM ET PRENOM DE L'AUTEUR, CONTENU DU POST, COMMENTAIRE : CONTENU + NOM ET PRENOM DE L'AUTEUR POUR CHAQUE POST
exports.getAllPosts = (req, res, next) => {
    Post.getAll((err, data) => {
      if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
    //for each getonepost
    });
};*/


/*CREER UN POST
createPost
*/

/**
 * EDITER UN POST
 */
