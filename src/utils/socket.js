const socket = require("socket.io");

const intializeSocket = (server) => {

 const io = socket(server, {
   cors: {
     origin: "http://localhost:5173"
   },
 })
 
 io.on("connection", (socket) => {
  // handle events 
  socket.on("joinChat", () => {
    console.log("User Joined the Chat");
 });

 socket.on("sendMessage", () => {

 }):

 socket.on("disconnect", () => {

 }):
})

module.exports = intializeSocket;