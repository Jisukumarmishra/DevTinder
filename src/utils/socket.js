const socket = require("socket.io");

const intializeSocket = (server) => {

 const io = socket(server, {
   cors: {
     origin: "http://localhost:5173"
   },
 })
 
 io.on("connection", (socket) => {
  // handle events 
  socket.on("joinChat", ({firstName, userId, targetUserId}) => {
    // now creating a room for individuals peoples
    // whenver a chat is happen that happens inside the room and in that room there is some participant
    const roomId  = [userId, targetUserId].sort().join("_"); // room id should be same for the two people talk with each others show we do short
    console.log("Joining Room : " + roomId)
    socket.join(roomId);
   
  });

 socket.on("sendMessage", ({ firstName,userId, targetUserId,message } ) => {
  
 });

 socket.on("disconnect", () => {

 });

})
}

module.exports = intializeSocket;