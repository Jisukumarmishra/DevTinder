const socket = require("socket.io");
const crypto = require("crypto");

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

 socket.on("sendMessage", ({ firstName,userId, targetUserId,text } ) => {

  // now whetever message we got from the client we have to send to the room that we create 
  const roomId = getSecretRoomId(userId, targetUserId);
  // console.log(firstName + " " + text);
  io.to(roomId).emit("messageReceived", {firstName, text}); // emiting the messageReceives event form here that we listen on the client side
  
 });

 socket.on("disconnect", () => {

 });

})
}

module.exports = intializeSocket;