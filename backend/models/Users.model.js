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
User.findOneByEmail = (email) => {
  return new Promise((resolve,reject) => {
    sql.query('SELECT * FROM gp_users WHERE email = ? ', email, (err, res) => { 
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
    });
  })
};

//TROUVER UN UTILISATEUR AVEC SON ID
User.findOneById = (userId) => {
  return new Promise((resolve,reject) => {
    sql.query("SELECT * FROM gp_users WHERE userId = ? ", userId, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
};

//CRÉATION D'UN UTILISATEUR DANS LA BDD
User.create = (newUser) => {
  return new Promise((resolve,reject) => {
    sql.query("INSERT INTO gp_users SET ?", newUser, (err,res) => {
      if(err) {
        reject(err);
        return;
      } else {
        resolve(res.insertId);
      }
    }); 
  })  
};


//SUPPRIME UN UTILISATEUR AVEC SON ID
User.deleteProfile = (userId) => {
  return new Promise((resolve,reject) => {
    sql.query("DELETE FROM gp_users WHERE userId = ?", userId, (err, res) => {
      if (err) {
        reject(err);
        } else {
        resolve(res);
        }
    });
  })
};

//MODIFIE UN UTILISATEUR AVEC SON ID
User.editProfile = ([email,lastname,firstname,department, userId]) => {
  return new Promise((resolve,reject) => {
    sql.query(`UPDATE gp_users SET email = '${email}', lastname = '${lastname}', firstname = '${firstname}', department = '${department}'  WHERE userId = '${userId}'`, (err, res) => {
      if (err) {
        reject(err);
        } else { 
        resolve(res);
        }
    });
  })
};

User.editProfileAndPassword = ([email,hash,lastname,firstname,department, userId]) => {
  return new Promise((resolve,reject) => {
    sql.query(`UPDATE gp_users SET email = '${email}', password = '${hash}', lastname = '${lastname}', firstname = '${firstname}', department = '${department}'  WHERE userId = '${userId}'`, (err, res) => {
      if (err){
        console.log(err);
        reject(err);
      }else{
        resolve(res);
      }
    })
  })
}

module.exports = User;

