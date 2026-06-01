 // Handle auth middleware for all /admin requests
// const adminAuth =  (req, res, next) => {
//   console.log("Admin auth is getting checked!!");
//   const token = "xyz";
//   const isAdminAuthorized = token === "xyz";

//   if (!isAdminAuthorized) {
//     res.status(401).send("Unauthorized request");
//   } else {
//     next();
//   }
// };

// const userAuth =  (req, res, next) => {
//   console.log("User auth is getting checked!!");
//   const token = "xz";
//   const isAdminAuthorized = token === "xyz";

//   if (!isAdminAuthorized) {
//     res.status(401).send("Unauthorized request");
//   } else {
//     next();
//   }
// };

// module.exports = {
//   adminAuth,  
//   userAuth,
// }
const jwt = require("jsonwebtoken")
const User = require("../models/user")
require("dotenv").config();

const userAuth = async (req, res, next) => {
  // read the token from the request cookies
  //validate the token 
  //find the user
  // const cookies = req.cookies;
  // const {token} = cookies;  

  try {
  const {token} = req.cookies; // reading the token from cookies
  if(!token) {
    throw new Error("Token Is Not Valid");
  }
  const decodeobj = await jwt.verify(token, process.env.JWT_SECRET); // validate token
  const {_id} = decodeobj; // extracting _id

  const user = await User.findById(_id); // find the user
  if(!user) {
    throw new Error ("User Is Not Found");
  }
  req.user = user;
  next()

  }
  catch (err) {
 res.status(400).send("ERROR: " + err.message);
  }
}

module.exports = {
  userAuth,
}

