const sql = require("./db.js");

// constructor
const Comment = function(comment) {
  this.content      = comment.content,
  this.postId       = comment.postId,
  this.userId       = comment.userId,
  this.date         = comment.date
};


//AJOUTER UN COMMENTAIRE DANS LA BDD
Comment.createComment = (newComment, result) => {
  sql.query("INSERT INTO comments SET ? ", newComment, (err,res)=>{
    if(err){
      result(err, null);
      return;
    } else {
      result(null, res);
      return;
    }
  })
}

//MODIFIER UN COMMENTAIRE
Comment.modifyComment = ([commentId, content], result) => {
  sql.query(`UPDATE comments SET content = '${content}' WHERE commentId = '${commentId}'`, (err, res)=>{
    if(err){
      result(err, null);
      return;
    } else {
      result(null,res);
      return;
    }
  })
}

//SUPPRIME UN COMMENTAIRE
Comment.deleteComment = (commentId, result) => {
  sql.query("DELETE FROM comments WHERE commentId = ?", commentId, (err, res) => {
    if (err) {
      result(err, null);
      return;
      } else {
      result(null, res);
      return;
      }
  });
};

  module.exports = Comment;