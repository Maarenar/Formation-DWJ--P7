const sql = require("./db.js");

// constructor
const Post = function(post) {
  this.postId       = post.postId,
  this.content      = post.content,
  this.likes        = post.likes,
  this.userLiked    = post.userId,
  this.date         = post.date,
  this.userLiked    = post.userLiked 
};

/*//CREER UN NOUVEL UTILISATEUR 
User.create = (newUser, result) => {
  sql.query("INSERT INTO gp-users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};*/

//TROUVER UN POST AVEC SON ID
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

/*//METTRE A JOUR LES INFORMATIONS D'UN UTILISATEUR
User.updateById = (id, user, result) => {
  sql.query(
    `UPDATE gp-users SET email = ?, password = ?, lastname = ?, firstname = ?, department = ?  WHERE id = ${userId}` ,
    [user.email, bcrypt.hash(user.password,10), user.lastname, user.firstname, user.department],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};*/

/*//SUPPRIMER UN UTILISATEUR
User.remove = (id, result) => {
  sql.query("DELETE FROM gp-users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};*/

module.exports = Post;

