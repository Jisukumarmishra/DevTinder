const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
};



module.exports = connectDB;