const express = require('express');

// this is create instance of the express.js application
const app = express();

app.use("/test",(req,res) =>{
  res.send("Hellow From The Server Testing");
})

app.use("/hellow",(req,res) =>{
  res.send("Hellow, Hellow, Hellow ........ ?");
})

app.use("/",(req,res) =>{
  res.send("Hellow From The Server");
})

app.listen(3000, () => {
  console.log("Server is SuccesFully Listening On Port 3000");
});
