const cron = require("node-cron");
const ConnectionRequestModel = require("../models/connectionRequest");
const {subDays,startOfDay, endOfDay} = require('date-fns')

cron.schedule("0 8 * * *", () => {
  // send email to all the people who get request the previous day

  try {

    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = (yesterday)
    const  yesterdayEnd = (yesterday)

    const pendingRequests =  ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte:yesterdayStart,
        $lt:yesterdayEnd,
      },
    }).populate("fromUserId toUserId");
    
    

  } catch (err) {

  }
})