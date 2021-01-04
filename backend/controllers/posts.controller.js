const Post = require('../models/Posts.models');

//AFFICHER UN POST AVEC : NOM ET PRENOM DE L'AUTEUR, CONTENU DU POST, COMMENTAIRE : CONTENU + NOM ET PRENOM DE L'AUTEUR
exports.getAllPosts = (req, res, next) =>{
  Post.getAll((err, data) => {
    if (err) {
      return res.status(500).json({ error : 'Erreur du serveur'});
    } else {
      console.log("post: ", data);
      return res.status(200).json({"posts" : data});
    }
  });
}


/*CREER UN POST
createPost
*/

/**
 * EDITER UN POST
 */
