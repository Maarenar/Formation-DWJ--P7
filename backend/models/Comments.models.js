const sql = require("./db.js");

// constructor
const Comment = function(comment) {
  this.content      = comment.content,
  this.postId       = comment.postId,
  this.userId       = comment.userId,
  this.date         = comment.date
};


//AJOUTER UN COMMENTAIRE DANS LA BDD
Comment.createComment = (newComment) => {
  return new Promise((resolve,reject) => {
    sql.query("INSERT INTO comments SET ? ", newComment, (err,res)=>{
      if(err){
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

//MODIFIER UN COMMENTAIRE
Comment.modifyComment = ([commentId, content]) => { 
  return new Promise((resolve,reject) => {
    sql.query(`UPDATE comments SET content = '${content}' WHERE commentId = '${commentId}'`, (err, res) => {
      if(err){
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

//SUPPRIME UN COMMENTAIRE
Comment.deleteComment = (commentId, result) => {
  return new Promise((resolve,reject) => {
    sql.query("DELETE FROM comments WHERE commentId = ?", commentId, (err, res) => {
      if (err) {
        reject(err);
        } else {
        resolve(res);
        }
    });
  })
};

module.exports = Comment;