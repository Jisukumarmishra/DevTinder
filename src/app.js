const express = require("express");

const app  = express();

app.get("/getUserData", (req, res) => {
  try {
  //Logic of DB Call And Get User Data
   throw new error("dfjkjdjhfidhf");

  res.send( "User Data Sent " );

  }
  catch (err) {
  res.status(500).send("Some error happen contact support Team")
  }

});


// error handleing
app.use("/", (err, req, res, next) => {
if(err) {
  // log your error
  res.status(500).send("Something Went Wrong");
}
})





















// const {adminAuth,userAuth} = require("./middlewares/auth")
// app.use("/admin", adminAuth);
// // app.use("/user",userAuth);

// app.post("/user/login", (req, res) => { // logically here we dont need to miidle where to authenticate
//   res.send("user logged Succesfully");
// });

// app.get("/user/data", userAuth, (req, res) => {// herre we need to middleware to authenticate because there is user data present
//   res.send("User Data Send")
// })

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All Data Sent");
// });

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("Deleted a user");
// });





















// app.use("/user",rH, [rH2,rh3,] rH4);

// app.use("/admin/getalldata", (req, res) =>{
//   // Logic For Fetching All Data
// res.send("send all data")
// });


// below example is middleware := function taht comes middle in the chain

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling the route user 1!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 2!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 3!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 4!!");
//     next();
//   },
//   (req, res) => {
//     console.log("Handling the route user 5!!");
//     res.send("5th Response!!");
//   }
// );

app.listen(7000, () => {
  console.log("Server is Succesfully Listening on port 7000");
});































// const express = require('express');

// this is create instance of the express.js application
// const app = express();


// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send({firstname: "Jisu", lastname: "mishra keep Your prioprities First"});
// });

// app.use("/user", (req, res)=> {
//   res.send("HAAAAAAAAAA.......");
// });    

// this will only handle get call to /user
// app.get("/user", (req, res) =>{
//   res.send({firstname:"Jisu", lastname: "Mishra"});
// });

// app.post("/user", (req, res) => {
 // write the logic for the  saving data to db
// res.send("Data successfully saved to the database");
// });

// app.patch("/user", (req,res) => { 
// res.send("User updated successfully For The Patch Route");
// });

// app.delete("/user", (req,res) => {
// res.send("Deleted Succesfully");
// });


// this route will match all the http method API calls to /test
// app.use("/test",(req,res) =>{
//   res.send("Hellow From The Server Testing Team Hi there ");
// });

// app.use("/hellow",(req,res) =>{
//   res.send("Hellow, Hellow, Hellow ........ ?");
// })

// app.use("/",(req,res) =>{
//   res.send("Hellow From The Server");
// })

// app.listen(3000, () => {
//   console.log("Server is SuccesFully Listening On Port 3000");
// });
