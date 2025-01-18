const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getUserController = async (req, res) => {
  try {
    // const users = await userModel.find({
    //   //   email: "bhalgharesantosh92@gmail.com",
    //   _id: req.body.id,
    // });
    const users = await userModel.findById({ _id: req.body.id }, { _id: 0, password: 0 });

    if (!users) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send({ success: true, length: users.length, users });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error in getUser Controller' });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { userName, phone, id } = req.body;
    const user = await userModel.findByIdAndUpdate({ _id: id });
    console.log(user.phone, phone);
    if (userName && phone) {
      user.userName = userName;
      user.phone = phone;
    }
    await user.save();
    return res.status(200).send({ success: true, message: 'User has been successfully updated!' });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: 'Some ERROR occured in UPDATE user API',
    });
  }
};

const passwordResetController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    console.log(email, newPassword, answer);
    //validation
    if (!email || !newPassword || !answer) {
      return res.status(500).send({ success: false, message: 'Please provide all details' });
    }
    //check if user exists
    const user = await userModel.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    //hashing of mew password

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //update user password

    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({
      success: true,
      message: 'Password has been updated successfully...',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'some error in password reset api' });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    //validation of fields
    if (!email || !oldPassword || !newPassword) {
      return res.status(500).send({ success: false, message: 'Please provide all details' });
    }
    //check if email is valid

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    //validate old password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(500).send({ success: false, message: 'old password is incorrect' });
    }

    //hashing of mew password

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //update user password

    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({
      success: true,
      message: 'Password has been updated successfully...',
    });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error in update password api' });
  }
};

const deleteUserController = async (req, res) => {
  //delete user from database
  try {
    // console.log(req.params.id);
    const user = await userModel.findByIdAndDelete(req.params.id);

    res.status(200).send({ success: true, message: `${user.userName} has been deleted!` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Error in delete user api' });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  passwordResetController,
  updatePasswordController,
  deleteUserController,
};
