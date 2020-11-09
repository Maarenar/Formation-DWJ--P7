const sql = require("./db.js");

// constructor
const User = function(user) {
  this.email        = user.email;
  this.password     = user.password;
  this.lastname     = user.lastname;
  this.firstname    = user.firstname;
  this.depatment    = user.department;
}; 

