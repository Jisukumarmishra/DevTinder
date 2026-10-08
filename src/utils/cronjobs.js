const cron = require("node-cron");
const {subDays,startOfDay, endOfDay} = require('date-fns');
const  sendEmail  = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest")


cron.schedule("38 16 * * *", async () => {
  // send email to all the people who get request the previous day

  try {

    const yesterday = subDays(new Date(), 0); // today data and 
    const yesterdayStart = startOfDay(yesterday)
    const  yesterdayEnd = endOfDay(yesterday)

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte:yesterdayStart,
        $lt:yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [...new Set(pendingRequests.map(req => req.toUserId.emailId))];
    console.log(listOfEmails);


    for( const email of listOfEmails) {
      // send emails 
      try {
        const res = await sendEmail.run(
          "New Friend Request pending For " + email,
          "there are so many friend request that are pending please login to devtinder.jisukumar.in and accept or reject the request."
        );
      console.log(res);
      } catch(err) {
        console.log(err);
      }
    }
   
  } catch (err) {
  console.error(err);
  }
})