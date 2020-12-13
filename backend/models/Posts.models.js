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
      } 

      // not found Post with the id
      result({ kind: "not_found" }, null);
    });
  };

/****************************************************************************
RÉCUPÉRER LE NOM ET LE PRÉNOM DE L'AUTEUR D'UN POST
*****************************************************************************/
Post.getAuthorName = (postId, result) => { 
  sql.query(`SELECT firstname, lastname FROM gp_users INNER JOIN gp_posts ON gp_users.userId = gp_posts.userId WHERE gp_posts.postId = ${postId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found author: ", res[0]);
      result(null, res[0]);
      return;
    } 

    // not found Post with the id
    result({ kind: "not_found" }, null);
  });
};

/****************************************************************************
RÉCUPÉRER LES COMMENTAIRES D'UN POST
*****************************************************************************/
Post.getPostComments = (postId, result) => { 
  sql.query(`SELECT commentId, comments.content, comments.userId, comments.date FROM comments INNER JOIN gp_posts ON comments.postId = gp_posts.postId WHERE gp_posts.postId = ${postId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null); 
      return;
    }
    if (res.length) {
      console.log("found comments: ", res[0]);
      result(null, res[0]);
      return;
    } 

    // not found
    result({ kind: "not_found" }, null);
  });
};

/****************************************************************************
TROUVER TOUS LES POSTS
*****************************************************************************/
/*Post.getAll = result => { 
  sql.query("SELECT * FROM gp_posts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("posts", res);
    result(null, res);
    return;
  });
};*/

/****************************************************************************
POSTER UN NOUVEAU POST
*****************************************************************************/
Post.createPost = (postId, result) => { 
  sql.query("INSERT INTO gp_posts VALUES ()", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found post: ", res[0]);
      result(null, res[0]);
      return;
    } 

    // not found Post with the id
    result({ kind: "not_found" }, null);
  });
};
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

