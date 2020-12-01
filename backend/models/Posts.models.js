const sql = require("./db.js");

// constructor
const Post = function(post) {
  this.postId       = post.postId,
  this.content      = post.content,
  this.likes        = post.likes,
  this.userId       = post.userId,
  this.date         = post.date,
  this.userLiked    = post.userLiked 
};

/****************************************************************************
TROUVER UN POST AVEC SON ID
*****************************************************************************/
Post.getOnePost = (postId, result) => { 
    sql.query(`SELECT * FROM gp_posts WHERE postId = ${postId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found post: ", res[0]);
        result(null, res[0]);
        return;
        //nom et prenom de l'auteur du post
          //SELECT * FROM gp_user INNER JOIN gp_posts ON gp_users.userId = gp_posts.userId

        //commentaire : recuparation du contenu et de l'id
          //SELECT * FROM comments INNER JOIN gp_posts ON comments.postId = gp_posts.postId

        //auteur du commentaire
          //SELECT firstname,lastname FROM gp_users INNER JOIN comments ON gp_users.userId = comments.userId AND comments.commentId = commentId
      }
  
      // not found Post with the id
      result({ kind: "not_found" }, null);
    });
  };

/****************************************************************************
TROUVER TOUS LES POSTS
*****************************************************************************/
/*
Post.getAll = result => { 
  sql.query( "SELECT * FROM gp_posts" , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("posts", res);
    result(null, res);
  });
};*/

/****************************************************************************
POSTER UN NOUVEAU POST
*****************************************************************************/
//INSERT INTO gp_posts VALUES ()

/****************************************************************************
EDITER UN POST
*****************************************************************************/
  //UPDATE gp_posts SET content = '' WHERE  postId =  (recuperer l'id du post)

/****************************************************************************
SUPPRIMER UN POST
*****************************************************************************/
  //DELETE FROM gp_posts WHERE postId = (recuperer l'id du post)

module.exports = Post;

