const express = require("express");
const connectDB = require("./config/database");
const user = require("./models/user");
const validator = require("validator");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {userAuth} = require("./middlewares/auth");

const app = express() // instaces of express 
const cors = require('cors')


app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);




// make an api to get the one user data from the database
//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId; // reading the body of the email id from the email that you getting

  try {
    console.log(userEmail)
  const user = await User.findOne({ emailId : userEmail});
  if(!user) {
    res.status(404).send("user Not Found")
  } else {
    res.send(user);
  }
  } 
  catch (err) {

  }

  // try {
  // const users = await User.find({emailId:userEmail}); // finding the user from the database
  // if(users.length === 0) {
  //   res.status(404).send("User not Found")
  // } else  {
  //   res.send(users)
  // }
  // // res.send(user); // sendint the user back
  // }

  // catch (err) {
  //   res.status(400).send("Something Went Wrong")
  // }
  
})




// feed api - GET/feed - get all teh user from the database
app.get("/feed", async(req, res)=> {
  try {
    const users = await User.find({});
    res.send(users);

  } 
  catch (err) {
    console.log(err);
    res.status(400).send("Error" + err.message);
  }

});


//api get user by id 
// app.get("/:id", async (req,res) => { //"/user/:id"(for params -> :)
//   try {
//   const id = await User.findById(req.params.id)
//   console.log(id);
//    if(!id) {
//       res.status(404).send("Id not found")
//     } else {
//       res.send(id)
//     } 
//   } 
//   catch (err) {
//    res.status(400).send("Invalid_ID")
//   }
// });





// delete the user form the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId; // read the body
  // also important fact chek:= Never Trust req.body 
  try {
   const user = await User.findByIdAndUpdate( {_id : userId })
  // const user = await User.findByIdAndDelete(userId)
  res.send("User Deleted Succesfully")
  } catch (err) {
    req.status(400).send("Something Went Wrong")
  }
})



//Update Data of The USer
app.patch("/user/:userId", async (req, res) => {
 const userId = req.params?.userId;
 const data = req.body// read the request

  try {
  const ALLOWED_UPDATES = [
  "photoUrl",
  "about",
  "gender",
  "age"
 ]

 const isUpdateAllowed = Object.keys(data).every((k) => 
 ALLOWED_UPDATES.includes(k)
 );
 
 if(!isUpdateAllowed){
  throw new Error ("Update Is Not Allowed")
 }

 if(data?.skills.length > 10) {
  throw new Error("Skills Cant Be More Than 10")
 }

  const user = await User.findByIdAndUpdate({_id: userId}, data, {
    returnDocument: "before", // by default before hi rahta hai
    runValidators : true
  });
  console.log(user)
  res.send(user)
  }
  catch (err) {
 res.status(400).send("Update Failed" + err.message)
  }
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
