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
      result(err, null);
      return;
    } else {
      result(null,res);
      return;
    }
  });
};

//RÉCUPÈRE LE NOM DE L'AUTEUR D'UN POST
Post.getAuthor = (userId, result) => {
  sql.query("SELECT firstname, lastname FROM gp_users WHERE userId = ?", userId, (err,res) =>{
    if(err){
      result(err, null);
      return;
    } else {
      result(null,res);
      return;
    }
  });
};

//RÉCUPÈRE LES COMMENTAIRES D'UN POST
Post.getComments = (postId, result) => {
  sql.query("SELECT commentId, content, userId, date FROM comments WHERE postId = ?", postId, (err,res) =>{
    if(err){
      result(err, null);
      return;
    } else {
      result(null,res);
      return;
    }
  });
};

//RÉCUPÈRE L'AUTEUR D'UN COMMENTAIRE D'UN POST
Post.getCommentAuthor = (commentId, result) => {
  sql.query("SELECT firstname, lastname FROM gp_users INNER JOIN comments ON gp_users.userId  = comments.userId WHERE commentId = ? ", commentId, (err,res) =>{
    if(err){
      result(err, null);
      return;
    } else {
      result(null,res);
      return;
    }
  });
};

//AJOUTER UN POST DANS LA BDD
Post.createPost = (newPost, result) => {
  sql.query("INSERT INTO gp_posts SET ?", newPost, (err,res)=>{
    if(err){
      result(err, null);
      return;
    } else {
      result(null, res);
      return;
    }
  })
}

//MODIFIER UN POST
Post.modifyPost = ([postId, content], result) => {
  sql.query(`UPDATE gp_posts SET content = '${content}' WHERE postId = '${postId}'`, (err, res)=>{
    if(err){
      result(err, null);
      return;
    } else {
      result(null,res);
      return;
    }
  })
}

//SUPPRIME UN POST
Post.deletePost = (postId, result) => {
  sql.query("DELETE FROM gp_posts WHERE postId = ?", postId, (err, res) => {
    if (err) {
      result(err, null);
      return;
      } else {
      result(null, res);
      return;
      }
  });
};

module.exports = Post;
 
