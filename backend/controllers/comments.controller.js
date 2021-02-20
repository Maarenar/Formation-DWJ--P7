const Comment = require('../models/Comments.models');
const User = require('../models/Users.model');

//CRÉER UN COMMENTAIRE
exports.createComment = (req,res,next) =>{
  let content = req.body.content;
  let userId  = req.body.userId;
  let postId  = req.body.postId;
  let date    = req.body.date ;
  const newComment = new Comment({
    content : content,
    userId : userId,
    postId : postId,
    date : date
  });
  Comment.createComment(newComment)
    .then(response => {
      return res.status(201).json({"Commentaire publié " : response});
    })
    .catch(error => res.status(500).json({ error }));
}

//EDITER UN COMMENTAIRE
exports.modifyComment = (req,res,next) => {
  let commentId = req.body.commentId;
  let content = req.body.content;
  Comment.modifyComment([commentId, content])
  .then(response => {
    return res.status(201).json({"Commentaire modifié " : response});
  })
  .catch(error => res.status(500).json({ error }));
}

//SUPPRIME UN COMMENTAIRE
exports.deleteComment = (req, res, next) => {
  let commentId = req.body.commentId;
  let userId = req.body.userId;
  
  Comment.getOneComment(commentId)
  .then(comment => {
    let userComment = comment[0].userId;
    User.findOneById(userId)
    .then(user => {
      let adminStatus = user[0].admin;
      if(userComment == userComment || adminStatus == 1){
        Comment.deleteComment(commentId)
        .then(response => {
          return res.status(201).json("Commentaire supprimé ! ");
        })
        .catch(error => res.status(500).json({ error : 'Erreur du serveur !'}));
      } else {
        return res.status(401).json("Non autorisé");
      }
    })
    .catch(error => res.status(500).json({ error : 'Utilisateur introuvable !'}));
  })
  .catch(error => res.status(500).json({ error : 'Commentaire introuvable !'}));
}
  
 
