const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGO_URI
  ); // this is how to connect with mongoose cluster
};

connectDB().then(()=>{
console.log("Database Connections established......")
}).catch(err => {
console.error("Database Cant be connected!!");
})