const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongodburi");

const connectdb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB CONNECTED");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectdb;
