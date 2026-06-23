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
const allowEditFields = ["firstName", "lastName","about","emailId","photoUrl", "gender", "age", "skills"];
const isEditAllowed = Object.keys(req.body).every((field) => {
return allowEditFields.includes(field)
});
return isEditAllowed;
};

const validateEditForgetpassword = (req) => {
  const allowEditFields = ["passWord"];
  return Object.keys(req.body).every((field) => {
  console.log(field);
  console.log(allowEditFields.includes(field));
  return allowEditFields.includes(field)
  });
}

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateEditForgetpassword,
  
}