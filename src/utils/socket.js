const socket = require("socket.io");

const intializeSocket = (server) => {

 const io = socket(server, {
   cors: {
     origin: "http://localhost:5173"
   },
 })
 
 io.on("connection", (socket) => {
  // handle events 
  socket.on("joinChat", ({userId, targetUserId}) => {
    // now creating a room for individuals peoples
    // whenver a chat is happen that happens inside the room and in that room there is some participant
    const room  = "uniqueId";
    socket.join(room);
   
  });

 socket.on("sendMessage", () => {

 });

 socket.on("disconnect", () => {

 });

})
}

module.exports = intializeSocket;