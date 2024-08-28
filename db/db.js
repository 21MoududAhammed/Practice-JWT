const mongoose = require("mongoose");

const connectDB =async(uri)=> {
  try {
    await mongoose.connect(uri);
    console.log("Database Connected Successfully!");
  } catch (err) {
    console.error(`Mongodb error: ${err}`);
    process.exit(1); // exit process for failure
  }
};

module.exports = connectDB;
