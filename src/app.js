const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express() // instaces of express 

app.post("/signup", async (req, res) => {
// creating the new instaces of the user model
const user =  new User({
  firstName : "Jisu",
  lastName : "Mishra",
  emailId : "jisuk138@gmail.com",
  password : "jisuuu@123"
});
 await user.save();
 res.send("user addeded succesfully ");
});

connectDB()
.then(() => {
  console.log("DataBase Connecton Estbalished...");
  app.listen(3000, () => {
  console.log("Sever is Succesfully Listening on port 3000...");
});
})
.catch((err) => {
  console.error("DataBase Canot Be Connected", err.message);
});
