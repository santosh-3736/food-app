const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Successfully Connected to MongoDB database ${mongoose.connection.host} `
        .bgYellow
    );
  } catch (error) {
    console.log("DB Error", error.message);
  }
};

module.exports = connectDb;
