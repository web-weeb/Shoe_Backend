const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection succesful");
  } catch (error) {
    console.error("db connection failed");
    process.exit(0);
  }
};

module.exports = connectDb;
