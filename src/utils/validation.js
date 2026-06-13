const validator = require("validator")

const validateSignUpData = (req) => {
  const {firstName, lastName, emailId, passWord } = req.body;
  if(!firstName || !lastName) {
    throw new Error ("Name Is Not Valid")
  } else if (!validator.isEmail(emailId)) {
    throw new Error ("Email Is Not Valid")
  } else if (!validator.isStrongPassword(passWord)) {
   throw new Error ("Please Enter a Strong PassWord")
  }
};

const validateEditProfileData = (req) => {
const allowEditFields = ["firstName", "lastName","about","emailId","PhotoUrl", "gender", "age", "skills"];
const isEditAllowed = Object.keys(req.body).every((field) => {
  allowEditFields.includes(field)
});
return isEditAllowed;
};

const validateEditForgetpassword = (req) => {
  const allowEditFields = ["passWord"];
  const isEditAllowed = Object.keys(req.body).every((field) => {
   return allowEditFields.includes(field)
  });
  // return isEditAllowed;
}

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateEditForgetpassword,
  
}