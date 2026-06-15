const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const requestRouter = express.Router();

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
 
  //creating a instances of the ConnectionRequest model
  const connectionRequest = new ConnectionRequest({
   fromUserId,
   toUserId,
   status
  });

  // save connectionRequestData in the database
  const data = await connectionRequest.save();

  res.json({
  message : "Connection Request Send Succeffuly ",
  data,
  });

  } 
  catch (err) {
 res.status(400).send("ERROR : " + err.message);
  }
})

module.exports = requestRouter;