const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.userType !== 'client') {
      return res.status(403).json({ message: 'You are not a client' });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Error in Order Cancel Middleware' });
  }
};
