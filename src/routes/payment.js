const express = require('express');
const { userAuth } = require('../middlewares/auth');
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");


// creaing a post api for creating an order
paymentRouter.post("/payment/create", userAuth , async (req, res) => {
 // here we will write our api code below that
 
 try {
  // this is making call to rajorPy instanse
  const order = await razorpayInstance.orders.create({
  "amount": 50000, // means 500 rupees
  "currency": "INR",
  "receipt": "receipt#1",
  "notes": {
    "firstName": "value3",
    "lastName": "value2",
    "memberShipType": "silver"
  },
  }) ;
    // save it to my database

  // return back my order details to fronted
  res.json({order}); 

 } catch (err) {
  console.log(err);
 }


})

module.exports = paymentRouter;