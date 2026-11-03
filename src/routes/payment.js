const express = require('express');
const { userAuth } = require('../middlewares/auth');
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { memeberShipAmount } = require('../utils/constants');
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils')

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

//creating a webhook api for payment verification
// it is a post api because razorpay will send some data also in the body of the request

paymenRouter.post("/paymnet/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get['x-Razorpay-Signature'];
   
  const isWebhookValid = validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.RAZORPAY_WEBHOOK_SECRET)
  
  if(!isWebhookValid) {
    return res.status(400).json({msg: "Invalid webhook signature"});
  }
  
  // now webhook is validate , now we validate the signature of the payment
  // req.body gives the access to a event object
   
  
  // update My Payment Status In DB
  const paymentDetails = req.body.payload.payment.entity;
  const payment = await Payment.findOne({orderId: paymentDetails.order_id}) 
    
  // Update The User As Premium
  // return success response to razorpay

  return res.status(200).json
   if (req.body.event === "payment.captured") {

   }

   if (req.body.event === "payment.failed") {
    
   }



  } catch (err) {
    console.log(err);
    return res.status(500).json({msg: err.message});
  }
})

module.exports = paymentRouter;