const express = require("express");

const chatRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

chatRouter.post("/chat", userAuth, async (req, res) => {
 const { targetUserId } = req.body;
 const userId = req.user._id;
 try {
  let chat = Chat.findOne({
    participants: { $all: [userId, targetUserId]}
  });
  if(!chat) {
    chat = new Chat({
      participants: [userId, targetUserId],
      messages: [],
    });
    await chat.save();
  }
  res.json(chat);
 } catch (error) {

  console.error(error);
  res.status(500).json({ error: "Internal server error" });
 }
})

module.exports = chatRouter ;