const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const userRouter = express.Router();


// get the all pending connections requests for the loggedInUser
userRouter.get("/user/requests/received", userAuth, async (req, res ) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId : loggedInUser._id,
      // status pending
      status : "interested"
    }).populate("fromUserId", "firstName lastName photUrl age gender about skills ");
    // }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message : "data fetched successfully",
      data : connectionRequests,
    })

  }
  catch (err) {
    res.status(400).send("ERROR : " + err.message );
  }
});



userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

  }
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


module.exports = userRouter;