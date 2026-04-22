const express = require("express");
const { connect } = require("mongoose");
const connectDB = require("./config/database");
require("./config/database")

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
});

connectDB()
.then(() => {
  console.log("DataBase Connecton Estbalished...");
  app.listen(3000, () => {
  console.log("Sever is Succesfully Listening on port 3000...");
});
})
.catch((err) => {
  console.error("DataBase Canot Be Connected");
});
