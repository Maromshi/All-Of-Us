const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/All-Of-Us");
    console.log("MongoDb is Connected");
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = connectDB;
