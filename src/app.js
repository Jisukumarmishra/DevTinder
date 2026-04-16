const express = require('express');

// this is create instance of the express.js application
const app = express();


app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({firstname: "Jisu", lastname: "mishra keep Your prioprities First"});
});

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
app.use("/test",(req,res) =>{
  res.send("Hellow From The Server Testing Team Hi there ");
});

app.use("/hellow",(req,res) =>{
  res.send("Hellow, Hellow, Hellow ........ ?");
})

app.use("/",(req,res) =>{
  res.send("Hellow From The Server");
})

app.listen(3000, () => {
  console.log("Server is SuccesFully Listening On Port 3000");
});
