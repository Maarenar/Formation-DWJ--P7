const sql = require("./db.js");

// constructor
const Comment = function(comment) {
  this.content      = comment.content,
  this.postId       = comment.postId,
  this.userId       = comment.userId,
  this.date         = comment.date
};


//TROUVER TOUS LES POSTS
Comment.getCommentsOnPost = (postId, result) => {
  sql.query("SELECT * FROM comments WHERE postId = ?" , postId ,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else{
      console.log(res);
      result(null,res);
      return;
    }
  });
};

//POST COMMENT
//INSERT INTO comments VALUES ()

//EDIT COMMENT
  //UPDATE comments SET content = '' WHERE  commentId =  (recuperer l'id du comment)

//DELETE COMMENT
  //DELETE FROM comments WHERE commentId = (recuperer l'id du comment)

  module.exports = Comment;