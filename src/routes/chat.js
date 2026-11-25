const express = require("express");

const chatRouter = express.Router();

chatRouter.post("/chat", await (req, res) = {
 const {userId, targetUserId } = req.body;
 try {
  let chat = Chat.findOne({
    participants: { $all: [userId, targetUserId]}
  })
 } catch (error) {

  console.error(error);
  res.status(500).json({ error: "Internal server error" });
 }
})

module.exports = chatRouter ;