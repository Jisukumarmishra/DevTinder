const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const ConnectionRequestModel = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId ) => {
 return crypto.createHash("sha256").update([userId, targetUserId].sort().join("_")).digest("hex");
}

const intializeSocket = (server) => {

 const io = socket(server, {
   cors: {
     origin: ["http://localhost:5173","https://devtinder.jisukumar.in"],
     credentials: true,
   },
 })


 // authentication middleware for socket.io
 const jwt = require("jsonwebtoken");
 io.use((socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader) {
      return next(new Error("Authentication error: No cookies found"));
    }

    // Extract the "token" cookie (use the exact cookie name from your login route)
    const tokenCookie = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("token="));

    if (!tokenCookie) {
      return next(new Error("Authentication error: Token missing"));
    }

    const token = decodeURIComponent(tokenCookie.split("=")[1]);
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // match your Express userAuth secret

    socket.userId = decoded._id; // save verified ID on the socket instance
    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
});
 
 io.on("connection", (socket) => {
  // handle events 
  console.log("User Connected", socket.id)

  socket.on("joinChat", async ({firstName, targetUserId}) => {
    try {
      const userId = socket.userId;
      const isFriend = await ConnectionRequestModel.findOne({
      $or:[
        {fromUserId: userId, toUserId: targetUserId, status: "accepted"},
        {fromUserId: targetUserId, toUserId: userId, status: "accepted"},
      ]
    })

    if(!isFriend)  {
      return socket.emit("errorMessage", "You are not friends with this user");
    }
    const roomId  = getSecretRoomId(userId, targetUserId); 
    console.log(firstName + "Join the Room " + roomId )
    socket.join(roomId);

    } catch(error) {
      console.log(error);
    }
  });

  
 socket.on("sendMessage", async ({ firstName, lastName , targetUserId,text } ) => {
  try {
    const userId = socket.userId;
     // check if userId and targetUserId are friends
     const isFriend = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
          { fromUserId: targetUserId, toUserId: userId, status: "accepted" },
        ],
      });

      if (!isFriend) {
        return socket.emit("errorMessage", "You are not friends with this user");
      }
    const roomId = getSecretRoomId(userId, targetUserId);
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
    io.to(roomId).emit("messageReceived", {firstName,lastName, text}); // emiting the messageReceives event form here that we listen on the client side
  } catch (error) {
    console.log(error);
  }

 
  
 });

 socket.on("disconnect", () => {

 });

})
}

module.exports = intializeSocket;