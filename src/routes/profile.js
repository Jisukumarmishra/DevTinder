const express = require('express');
const { userAuth } = require('../middlewares/auth');
const profileRouter = express.Router();


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
validateEditProfileData(req);
}
catch (err) {
  res.status(400).send("EROR : " + err.message);
}
});
module.exports = profileRouter;