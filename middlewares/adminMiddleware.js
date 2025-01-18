const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
  try {
    // console.log(req.body);
    const user = await userModel.findById(req.body.id);
    if (user.userType !== 'admin') {
      return res.status(401).send({ success: false, message: 'Only admin have access' });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Error in admin middleware' });
  }
};
