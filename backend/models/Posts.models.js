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

//RÉCUPÉRER LE NOM DE L'AUTEUR D'UN POST
Post.getAuthor = (userId, result) => {
  sql.query("SELECT firstname, lastname FROM gp_users WHERE userId = ?", userId, (err, res)=> {
    if(err){
      //console.log("error: ", err);
      result(err, null);
      return;
    } else {
      //console.log("nom de l'auteur", res);
      result(null, res);
      return;
    }
  })
}

//RÉCUPÉRER LE NOM DE L'AUTEUR D'UN POST
Post.getComments = (postId, result) => {
  sql.query("SELECT content,postId,userId FROM comments WHERE postId = ?", postId, (err, res)=> {
    if(err){
      //console.log("error: ", err);
      result(err, null);
      return;
    } else {
      //console.log("nom de l'auteur", res);
      result(null, res);
      return;
    }
  })
}




module.exports = Post;

