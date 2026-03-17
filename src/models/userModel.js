const db = require("../config/db");

exports.findByEmail = async(email)=>{
 const [rows] = await db.query(
   "SELECT * FROM users WHERE email=?",[email]
 );
 return rows[0];
};

exports.createUser = async(user)=>{
 const sql =
 "INSERT INTO users(name,email,password,verification_token) VALUES(?,?,?,?)";

 await db.query(sql,
   [user.name,user.email,user.password,user.token]);
};