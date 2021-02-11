const Comment = require('../models/Comments.models');

//CRÉER UN COMMENTAIRE
exports.createComment = (req,res,next) =>{
  let content = req.body.content;
  let userId  = req.body.userId;
  let postId  = req.body.postId;
  let date    = req.body.date ? req.body.date : null;
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
  Comment.deleteComment(commentId)
  .then(response =>{
    return res.status(200).json({"Commentaire supprimé " : response});
  })
  .catch(error => res.status(500).json({ error }));
}
 
