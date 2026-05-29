const mongoose = require('mongoose');
const validator = require("validator");

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
    trim : true, // mongodb treated same emailid but with the some extra spaces is same to prevent use this 
    validate(value) {
     if (!validator.isEmail(value)){
      throw new Error("Invalid Email Address" + value)
     }
    }
  },

  passWord : {
    type : String,
    required : true,
    validate(value) {
     if (!validator.isStrongPassword(value)){
      throw new Error("Enter A Strong passWord G@n.... Nhi To Hack Ho Jayega" + value)
     }
    },
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
    },
  },


  photoUrl : {
    type : String,
    default : "https://example.com/photo.jpg",
    validate(value) {
     if (!validator.isURL(value)){
      throw new Error("Invalid URL Address" + value)
     }
    },
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
