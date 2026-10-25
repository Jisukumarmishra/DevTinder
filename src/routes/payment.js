const express = require('express');
const { userAuth } = require('../middlewares/auth');
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { memeberShipAmount } = require('../utils/constants');

// creaing a post api for creating an order
paymentRouter.post("/payment/create", userAuth , async (req, res) => {
 // here we will write our api code below that
 
 try {

  const {memberShipType} = req.body;
  const {firstName, lastName, emailId} = req.user;
  // this is making call to rajorPy instanse
  const order = await razorpayInstance.orders.create({
  amount: memeberShipAmount[memberShipType] * 100,
  currency: "INR",
  receipt: "receipt#1",
  notes: {
    firstName,
    lastName,
    emailId,
    memberShipType: memberShipType
  },
  }) ;
    // save it to my database
    // console.log(order);
    
    const payment = new Payment({
      userId : req.user._id,
      orderId : order.id,
      status : order.status,  
      amount : order.amount,
      currency : order.currency,
      receipt : order.receipt,
      notes : {
        firstName : order.notes.firstName,
        lastName : order.notes.lastName,      
        memberShipType : order.notes.memberShipType,
      }
    });

    const savepayment = await payment.save();

  // return back my order details to fronted
  res.json({...savepayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID}); 

 } catch (err) {
  console.log(err);
 }


})

module.exports = paymentRouter;