const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: Number,
      required: [true, "phone no is required"],
    },
    userType: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2014/04/02/10/48/symbol-304598_1280.png",
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },

  { timestamps: true }
);

// exports model

module.exports = mongoose.model("User", userSchema);
