const sql = require("./db.js");

// constructor
const Comment = function(comment) {
  this.commentId    = comment.commentId,
  this.content      = comment.content,
  this.postId       = comment.postId,
  this.userId       = comment.userId,
  this.date         = comment.date
};