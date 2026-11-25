const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

const getSecretRoomId = (userId, targetUserId ) => {
 return crypto.createHash("sha256").update([userId, targetUserId].sort().join("_")).digest("hex");
}

const intializeSocket = (server) => {

 const io = socket(server, {
   cors: {
     origin: "http://localhost:5173"
   },
 })
 
 io.on("connection", (socket) => {
  // handle events 
  console.log("User Connected", socket.id)
  socket.on("joinChat", ({firstName, userId, targetUserId}) => {
    const roomId  = getSecretRoomId(userId, targetUserId); 
    console.log(firstName + "Join the Room " + roomId )
    socket.join(roomId);
  });

  
 socket.on("sendMessage", async ({ firstName,userId, targetUserId,text } ) => {
  // now whetever message we got from the client we have to send to the room that we create 
  const roomId = getSecretRoomId(userId, targetUserId);
  // whenver someone send a message to the server we have to save it in the database and then we have to send it to the room that we create for the two users
  try {
    let chat = await Chat.findOne({participants: {$all: [userId, targetUserId]}}); // find the chat between the two users
    if(!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages:[]
      })
    }

    // now we have to push the message to the messages array of the chat
    chat.messages.push({
      senderId: userId,
      text,
    })

    await chat.save();

  } catch (error) {
    console.log(error);
  }

  io.to(roomId).emit("messageReceived", {firstName, text}); // emiting the messageReceives event form here that we listen on the client side
  
 });

 socket.on("disconnect", () => {

 });

})
}

module.exports = intializeSocket;