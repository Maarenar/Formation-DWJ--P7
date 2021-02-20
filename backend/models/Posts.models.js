const sql = require("./db.js");

// constructor
const Post = function(post) {
  this.content      = post.content,
  this.userId       = post.userId,
  this.date         = post.date
};

/**
 * [getAll description]
 *
 * @return  {Object}  [return description]
 */
Post.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM gp_posts ORDER BY date DESC", (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
  
};

Post.getOnePost = (postId) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM gp_posts WHERE postId = ?" , postId, (err,res) => {
      if(err){
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

//RÉCUPÈRE LE NOM DE L'AUTEUR D'UN POST
Post.getAuthor = (userId) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT firstname, lastname, admin FROM gp_users WHERE userId = ? ", userId, (err,res) => {
      if(err){
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
  
};

//RÉCUPÈRE LES COMMENTAIRES D'UN POST
Post.getComments = (postId) => {
  return new Promise((resolve,reject) => {
    sql.query("SELECT commentId, content, userId, date FROM comments WHERE postId = ?", postId, (err,res) =>{
      if(err){
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
};

//RÉCUPÈRE L'AUTEUR D'UN COMMENTAIRE D'UN COMMENTAIRE
Post.getCommentAuthor = (commentId) => {
  return new Promise((resolve,reject) => {
    sql.query("SELECT firstname, lastname FROM gp_users INNER JOIN comments ON gp_users.userId  = comments.userId WHERE commentId = ? ", commentId, (err,res) =>{
      if(err){
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
};

//AJOUTER UN POST DANS LA BDD
Post.createPost = (newPost) => {
  return new Promise((resolve,reject) => {
    sql.query("INSERT INTO gp_posts SET ?", newPost, (err,res)=>{
      if(err){
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

//MODIFIER UN POST
Post.modifyPost = ([postId, content]) => {
  return new Promise((resolve,reject) => {
    sql.query(`UPDATE gp_posts SET content = '${content}' WHERE postId = '${postId}'`, (err, res)=>{
      if(err){
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

//SUPPRIME UN POST
Post.deletePost = (postId) => {
  return new Promise((resolve,reject) => {
    sql.query("DELETE FROM gp_posts WHERE postId = ?", postId, (err, res) => {
      if (err) {
        reject(err);
        } else {
        resolve(res);
        }
    });
  })
};

module.exports = Post;
 
