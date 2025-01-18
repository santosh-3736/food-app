const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    //get the token

    const token = req.headers['authorization'].split(' ')[1];
    // console.log(req.headers["authorization"].split(" "));
    // console.log(token);
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log(err);
        res.status(500).send({ success: false, message: 'Un-athorize User' });
      } else {
        // console.log(decode);
        // console.log(decode.id);
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Error in auth Middleware' });
  }
};
