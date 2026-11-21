const mongoose = require("mongoose");

const chatSchema = new mongoose.createSchema({
  
});

const Chat = mongoose.model("Chat", chatSchema)

module.exports = {Chat};