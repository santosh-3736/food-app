const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone, answer } = req.body;
    //validation

    if (!userName || !email || !password || !address || !phone || !answer) {
      res
        .status(500)
        .send({ success: false, message: "Please provide all fields" });
    }

    //check if existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(500).send({
        success: false,
        message: "Email Already Registred please login",
      });
    } else {
      // hashing
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //create new user

      const newUser = await userModel.create({
        userName,
        email,
        password: hashedPassword,
        address,
        phone,
        answer,
      });

      res.status(201).send({
        success: true,
        message: "User has been successfully registered!",
        newUser,
      });
    }
    // res.status(200).send({ success: true, message: "<h1>Do Register :)</h1>" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "ERROR in REGISTER API", error });
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res
        .status(500)
        .send({ success: false, message: "Please provide email or password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    // check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    user.password = undefined;

    //jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    if (isValidPassword) {
      return res
        .status(200)
        .send({ success: true, message: "Login Successfully!", token, user });
    }

    return res
      .status(401)
      .send({ success: false, message: "Invalid Password" });
  } catch (error) {
    console.log("Error in Login API", error);
    res
      .status(500)
      .send({ success: false, message: "Error in Login API", error });
  }
};
module.exports = { registerController, loginController };
