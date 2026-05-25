const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express() // instaces of express 

app.use(express.json());

app.post("/signup", async (req, res) => {
// creating the new instaces of the user model
const user =  new User(req.body);

console.log(req.body);

try {
 await user.save();
 res.send("user addeded succesfully ");
}
catch (err) {
  res.status(400).send("Error saving the user :"+ err.message);
}

});

// make an api to get the one user data from the database
//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId; // reading the body of the email id from the email that you getting

  try {
  const users = await User.find({emailId:userEmail}); // finding the user from the database
  if(users.length === 0) {
    res.status(404).send("User not Found")
  } else  {
    res.send(users)
  }
  // res.send(user); // sendint the user back
  }

  catch (err) {
    res.status(400).send("Something Went Wrong")
  }
  
})

// feed api - GET/feed - get all teh user from the database
app.get("/feed",(req, res)=> {

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
