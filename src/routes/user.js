const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"


// get the all pending connections requests for the loggedInUser
userRouter.get("/user/requests/received", userAuth, async (req, res ) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId : loggedInUser._id,
      // status pending
      status : "interested"
    }).populate("fromUserId", USER_SAFE_DATA);
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
    
    const connectionRequests = await ConnectionRequestModel.find({
      $or : [
        {toUserId :loggedInUser._id, status: "accepted" },
        {fromUserId : loggedInUser._id, status: "accepted"},      
      ],
    }).populate("fromUserId", USER_SAFE_DATA );

    res.json({ data: connectionRequests});

    const data = connectionRequests.map((row) => row.fromUserId );
    res.json({data});

  }
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


module.exports = userRouter;