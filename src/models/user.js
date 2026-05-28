const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    minLength : 3,
    maxLength : 50
  },

  lastName : {
    type : String
  },
  
  emailId : {
    type: String,
    unique : true,
    required : true,
    lowercase : true,
    trim : true // mongodb treated same emailid but with the some extra spaces is same to prevent use this 
  },

  passWord : {
    type : String,
    required : true
  },

  age : {
    type : Number,
    min : 18
  },
  gender : {
    type : String,
    validate(value) {
      if(!["male", "female", "others"].includes(value)) {
        throw new Error ("Gender Data Is Not Valid")
      }
    }
  },
  photoUrl : {
    type : String,
    default : "Some Url"
  },
  about:  {
    type: String,
    default: "This Is a Default About A User"
  },
  skills: {
    type : [String]
  }


},{
  timestamps : true
});

// const User = mongoose.model("user", userSchema);
// module.exports = User;  

// or 
module.exports = mongoose.model("User", userSchema);
