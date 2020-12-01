const sql = require("./db.js");

// constructor
const Comment = function(comment) {
  this.commentId    = comment.commentId,
  this.content      = comment.content,
  this.postId       = comment.postId,
  this.userId       = comment.userId,
  this.date         = comment.date
};

//POST COMMENT
//INSERT INTO comments VALUES ()

//EDIT COMMENT
  //UPDATE comments SET content = '' WHERE  commentId =  (recuperer l'id du comment)

//DELETE COMMENT
  //DELETE FROM comments WHERE commentId = (recuperer l'id du comment)