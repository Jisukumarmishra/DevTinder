const express = require('express');
const { userAuth } = require('../middlewares/auth');
const paymentRouter = express.Router();


// creaing a post api for creating an order
paymentRouter.post("/payment/create", userAuth , async (req, res) => {
 // here we will write our api code below that
 
 try {

 } catch (err) {
  console.log(err);
 }


})

module.exports = paymentRouter;