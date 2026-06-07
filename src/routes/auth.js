const express = require('express');
const authRouter = express.Router(); 
const User = require("../models/user");
const bcrypt = require("bcrypt") 
const {validateSignUpData} = require("../utils/validation");
const validator = require("validator");


authRouter.post("/signup", async (req, res) => {

 try {

// validation of data
validateSignUpData(req)
const {firstName, lastName, passWord, emailId } = req.body

// Encrypt The Password
const passwordHash = await bcrypt.hash(passWord,10);
console.log(passwordHash);

// creating the new instaces of the user model
const user =  new User({
  firstName,
  lastName,
  emailId,
  passWord: passwordHash
});

 await user.save();
 res.send("user addeded succesfully ");
}
catch (err) {
  res.status(400).send("ERROR: "+ err.message);
}

});



// api for the login
authRouter.post("/login", async (req, res) => {
 try {

 const {emailId, passWord} = req.body;
 // emailId Validations
 if(!validator.isEmail(emailId)) {
  throw new Error ("Invalid Email ID")
 }
 
 const user = await User.findOne({emailId: emailId});
 if(!user) {
  throw new Error("Invalid Credentials")
 }

 const isPassWordValid = await user.validatePassword(passWord);

 if(isPassWordValid) {
  // create a jwt token

  const token = await user.getJWT();

  // add the token to cokkies and send the response back to the user
  res.cookie("token", token, {
  expires: new Date (Date.now() + 8 * 3600000), // expire in 8 hrs
});
  res.send("login successfully!!!")
 } else {
  throw new Error("Invalid Credentials")
 }

 }
 catch (err) {
  res.status(400).send("Error : " + err.message);
 }

});




module.exports = authRouter;