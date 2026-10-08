const cron = require("node-cron");
const {subDays,startOfDay, endOfDay} = require('date-fns');
const  sendEmail  = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest")

// This Job Will run at 8 am in the morning everyday
cron.schedule("0 8 * * *", async () => {
  // send email to all the people who get request the previous day

  try {

    const yesterday = subDays(new Date(), 1); // today data and 
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
    // console.log(listOfEmails);


    for( const email of listOfEmails) {
      // send emails 
      try {
        const res = await sendEmail.run(
          "New Friend Request pending For " + email,
          "there are so many friend request that are pending please login to devtinder.jisukumar.in and accept or reject the request."
        );
      // console.log(res);
      } catch(err) {
        console.log(err);
      }
    }
   
  } catch (err) {
  console.error(err);
  }
})


// if there is millions or lakhs of user in the devtinder.com or eg:- facebook.com then sending the email like this 
// failed sure beacuse here we do for loop and then sending the email individually. also some time 
// pendingRequests this query may be very expensive or take to much time.

// for resolve this there is varous way 
// 1) using queuing(creating own quue in the nodejs process and send inside batches) using beque or bull node packarge :-- this is also called batch processing
// 2) send then into bulk operations ans ses manage things (send bulk operations to amazon ses they will handle for you )
// 3) query is paginated