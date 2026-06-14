// connectionRequest Define The Connection Between The Two User

const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({
 
  fromUserId: {
  type : mongoose.Schema.Types.ObjectId,
  required : true,
  },
  
  toUserId : {
    type:mongoose.Schema.Types.ObjectId,
    required : true,
  },

  staus : {
    type : String,
    required : true ,
    enum :  {
      type : ["ignore", "interested", "accepted", "rejected"],
      message :`{VALUE} is incorrect status type`
    },
  },
}, {
  timestamps : true,
});

const ConnectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel