const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const requestRouter = express.Router();
const User  = require("../models/user");


requestRouter.post("/sendConnectionRequest", userAuth, async(req, res) => {
  const user = req.user;
  // sending a connection request
  console.log("Sending a Connections Request");
  res.send(user.firstName +  "sent the connection request");
});


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status
  
  const allowedStatus = ["ignored", "interested"];
  if(!allowedStatus.includes(status)) {
    return res.status(400).json({message :"Invalid Status Type: "} + status);
  } 

  const toUser = await User.findById(toUserId);
  if(!toUser) {
    return res.status(404).json({ message : "User Not Found "});
  }

  const existingConnectionRequest = await ConnectionRequest.findOne({
    $or :[
      {fromUserId : toUserId},
      {fromUserId : toUserId, toUserId : fromUserId},
    ],
  });

  if(existingConnectionRequest) {
    return res
    .status(400)
    .send({message : "Connection Request Already Exists !!!"})
  }
 
  //creating a instances of the ConnectionRequest model
  const connectionRequest = new ConnectionRequest({
   fromUserId,
   toUserId,
   status
  });

  // save connectionRequestData in the database
  const data = await connectionRequest.save();

  res.json({
  message :req.user.firstName + " is " + status + " in " + toUser.firstName,
  data,
  });

  } 
  catch (err) {
 res.status(400).send("ERROR : " + err.message);
  }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
 const loggedInUser = req.user;

 
  } 
  catch (err) {
 res.status(400).send("ERROR : " + err.message);
  }
})

module.exports = requestRouter;