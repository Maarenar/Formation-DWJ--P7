const Comment = require('../models/Comments.models');

//AFFICHER UN POST AVEC : NOM ET PRENOM DE L'AUTEUR, CONTENU DU POST, COMMENTAIRE : CONTENU + NOM ET PRENOM DE L'AUTEUR
exports.getComments = (req, res, next) =>{
    let postId = req.params.postId;
    Comment.getCommentsOnPost(postId, (err, data) => {
    if (err) {
      return res.status(500).json({ error : 'Erreur du serveur'});
    } else {
      console.log("post: ", data);
      return res.status(200).json({"posts" : data});
    }
  });
}
