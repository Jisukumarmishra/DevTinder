const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const userRouter = express.Router();
const User = require('../models/user')

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
    })
    .populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    })

    // res.json({ data: connectionRequests});

    // const data = connectionRequests.map((row) => row.fromUserId );
    res.json({data});

  }
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


userRouter.get("/user/feed",userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // find all the connectionsRequest (send + received) for the loggedInUser
    const connectionsRequests = await ConnectionRequestModel.find({
      $or: [
        {fromUserId : loggedInUser._id},
        {toUserId : loggedInUser._id},
      ]
    }).select("fromUserId toUserId");

    const hideusersFormFeed = new Set ();
    connectionsRequests.forEach((req) => {
      hideusersFormFeed.add(req.fromUserId.toString());
      hideusersFormFeed.add(req.toUserId.toString());
    })
    console.log(hideusersFormFeed);

    const users = await User.find({
      $and : [
      {_id : { $nin : Array.from(hideusersFormFeed)}},
      {_id : { $ne : loggedInUser._id}},
      ],
    }).select(USER_SAFE_DATA);

    res.send(users);

    // const connectionsPendings =
    // const connectionsAccepted =

  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
})


module.exports = userRouter;