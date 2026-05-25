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
