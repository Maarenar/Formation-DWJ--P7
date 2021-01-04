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
      } else if (res.length === 0) {
      console.log("utilisateur non trouvé:",  res);
      result(null, res.length);
      return;
    } else if (res.length > 0){
      result(null, res);
      return;
    }
  });
};

//TROUVER UN UTILISATEUR AVEC SON ID
User.findOneById = (userId, result) => {
  sql.query("SELECT * FROM gp_users WHERE userId = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log("utilisateur" , res);
      result(null, res);
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
    } else {
      console.log("created user:", res.insertId);
      result(null, res.insertId);
      return;
    }
  });   
};


//SUPPRIME UN UTILISATEUR AVEC SON ID
User.deleteProfile = (userId, result) => {
  sql.query("DELETE FROM gp_users WHERE userId = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
      } else { 
      console.log("utilisateur supprimé:",  res.affectedRows );
      result(null, res.affectedRows);
      return;
      }
  });
};

//MODIFIE UN UTILISATEUR AVEC SON ID
User.editProfile = ([email,lastname,firstname,department, userId], result) => {
  sql.query(`UPDATE gp_users SET email = '${email}', lastname = '${lastname}', firstname = '${firstname}', department = '${department}'  WHERE userId = '${userId}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
      } else { 
      result(null, res);
      return;
      }
  });
};



module.exports = User;

