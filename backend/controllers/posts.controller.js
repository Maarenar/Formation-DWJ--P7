const Post = require('../models/Posts.models');

//AFFICHER UN POST AVEC : NOM ET PRENOM DE L'AUTEUR, CONTENU DU POST, COMMENTAIRE : CONTENU + NOM ET PRENOM DE L'AUTEUR
exports.getAllPosts = (req, res, next) =>{
  Post.getAll((err, data) => {
    if (err) {
      return res.status(500).json({ error : 'Erreur du serveur'});
    } else {
      data.forEach(element => {
        let userId = element.userId;
        let postId = element.postId;
        Post.getAuthor(userId, (err, data) =>{
          if(err){
            return res.status(500).json({ error : 'Erreur du serveur'});
          }else {
            let author= JSON.stringify(data);
            console.log("auteur: ", author);
            //return res.status(200).json({"auteur" : author});
          }
        });
        Post.getComments(postId, (err,data)=>{
          if(err){
            return res.status(500).json({ error : 'Erreur du serveur'});
          } else { 
            let comments = JSON.stringify(data);
            console.log("commentaires : ", comments);
            //return res.status(200).json({"commentaires" : comments});
          }
        })
      });
    }
  });
}

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
