const sql = require("./db.js");

// constructor
const User = function(user) {
  this.email        = user.email,
  this.password     = user.password,
  this.lastname     = user.lastname,
  this.firstname    = user.firstname,
  this.department   = user.department
}; 

//TROUVER UN UTILISATEUR AVEC SON EMAIL
User.findOneByEmail = (email, result) => {
  sql.query("SELECT * FROM gp_users WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
      } else if(res.length === 0) {
      console.log("utilisateur non trouvé:",  res.length );
      result(null, res.length);
      return;
    } else if(res.length > 0){
      console.log("utilisateur trouvé:", res.length);
      result(null, res.length);
      return;
    }
  });
};

//CRÉATION D'UN UTILISATEUR DANS LA BDD
User.create = (newUser, result) => {
  sql.query("INSERT INTO gp_users SET ?", newUser, (err,res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else{
      console.log("created user:", res.insertId);
      result(null, res.insertId);
      return;
    }
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



module.exports = User;

