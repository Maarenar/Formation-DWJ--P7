const sql = require("./db.js");

// constructor
const Post = function(post) {
  this.content      = post.content,
  this.userId       = post.userId,
  this.date         = post.date
};

//TROUVER TOUS LES POSTS
Post.getAll = (result) => {
  sql.query("SELECT * FROM gp_posts",(err, res) => {
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






module.exports = Post;

