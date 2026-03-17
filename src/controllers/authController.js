// const bcrypt = require("bcryptjs");
// const userModel = require("../models/userModel");
// const {generateAccessToken,generateRefreshToken} = require("../utils/generateToken");
// const randomToken = require("../utils/generateRandomToken");
// const {sendEmail} = require("../services/emailService");

// exports.signup = async(req,res)=>{

//  const {name,email,password} = req.body;

//  const existing = await userModel.findByEmail(email);
//  if(existing) return res.status(400).json({message:"User exists"});

//  const hash = await bcrypt.hash(password,10);

//  const token = randomToken();

//  await userModel.createUser({
//   name,email,password:hash,token
//  });

//  await sendEmail(email,"Verify account",
//  `Verify link: http://localhost:5000/api/auth/verify/${token}`);

//  res.json({message:"Signup successful. Verify email"});
// };

// exports.login = async(req,res)=>{

//  const {email,password} = req.body;

//  const user = await userModel.findByEmail(email);

//  if(!user) return res.status(400).json({message:"User not found"});

//  const match = await bcrypt.compare(password,user.password);

//  if(!match) return res.status(400).json({message:"Invalid password"});

//  const accessToken = generateAccessToken(user);
//  const refreshToken = generateRefreshToken(user);

//  res.json({accessToken,refreshToken});
// };

const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const randomToken = require("../utils/generateRandomToken");
const { sendEmail } = require("../services/emailService");

exports.signup = async (req, res, next) => {

 try {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
   return res.status(400).json({
    message: "All fields required"
   });
  }

  const existing = await userModel.findByEmail(email);

  if (existing) {
   return res.status(400).json({
    message: "User already exists"
   });
  }

  const hash = await bcrypt.hash(password, 10);

  const token = randomToken();

  await userModel.createUser({
   name,
   email,
   password: hash,
   token
  });

  // email verification (optional)
  try {

   await sendEmail(
    email,
    "Verify account",
    `Verify link: http://localhost:5000/api/auth/verify/${token}`
   );

  } catch (emailError) {

   console.log("Email not sent:", emailError.message);

  }

  res.json({
   message: "Signup successful"
  });

 } catch (err) {

  next(err);

 }

};


exports.login = async (req, res, next) => {

 try {

  const { email, password } = req.body;

  if (!email || !password) {
   return res.status(400).json({
    message: "Email and password required"
   });
  }

  const user = await userModel.findByEmail(email);

  if (!user) {
   return res.status(400).json({
    message: "User not found"
   });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
   return res.status(400).json({
    message: "Invalid password"
   });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({
   message: "Login successful",
   accessToken,
   refreshToken
  });

 } catch (err) {

  next(err);

 }

};