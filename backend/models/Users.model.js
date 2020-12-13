const sql = require("./db.js");

// constructor
const User = function(user) {
  this.email        = user.email,
  this.password     = user.password,
  this.lastname     = user.lastname,
  this.firstname    = user.firstname,
  this.department   = user.department
}; 

//CRÉATION D'UN NOUVEL UTILISATEUR
User.create = (newUser, result) => {
  sql.query("INSERT INTO gp_users SET ?", newUser, (err,res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 

    console.log("created user:", {id: res.insertId, ...newUser});
    result(null, { id: res.insertId, ...newUser });
    return;
  });
};

//TROUVER UN UTILISATEUR AVEC SON ID
User.findOneById = (userId, result) => {
    sql.query(`SELECT * FROM gp_users WHERE userId = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

//TROUVER UN UTILISATEUR AVEC SON EMAIL
User.findOneByEmail = (email, result) => {
  sql.query("SELECT * FROM gp_users WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

  
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;

