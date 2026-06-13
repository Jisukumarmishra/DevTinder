const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { validate, passWord } = require('../models/user');
const validator = require("validator");
const {validateEditProfileData, validateEditForgetpassword } = require("../utils/validation");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view",userAuth, async (req,res) => {
  try {
  const user = req.user;
  res.send(user);
  }
  catch (err) {
    res.status(400).send("Error" + err.message);
  }
});


profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
try {
if(!validateEditProfileData(req)) {
  throw new Error("Invalid Edit Request!!");
  // or return res.status(400).send()

  const loggedInUser = req.user;
  // loggedInUser.firstName = req.body.firstName; or
  Object.keys(req.body).forEach((key) => (loggedInUser[key]= req.body[key]));
  await loggedInUser.save();
  // res.send(`${loggedInUser.firstName} Your Profile is Updated SuccessFully`);
  //best practises
  res.json({
    message: `${loggedInUser.firstName}, Your Profile Updated Successfully`,
    data : loggedInUser,
  });
}
}
catch (err) {
  res.status(400).send("EROR : " + err.message);
}
});




profileRouter.patch("/profile/password", userAuth, async (req, res ) => {
  try {
    if(!validateEditForgetpassword(req)) {
      throw new Error("Invalid Fields");
    }
    
   const {password} = req.body;

   if(!validator.isStrongPassword(req.body.passWord)){
    throw new Error("Add Strong Password");
  }

    const loggedInUser = req.user;
    const hashedPassword = await bcrypt.hash(req.body.passWord, 10);

    loggedInUser.passWord = hashedPassword;

    // Object.keys(req.body).forEach((key) => loggedInuser[key]= req.body[key]);
    await loggedInUser.save();
    res.json({
      message : `${loggedInUser.firstName}, Your Password Updated Successfully`,
      data : loggedInUser,
    });

  } 
  catch(err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
 
module.exports = profileRouter;