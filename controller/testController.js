const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Test User Controller API",
    });
  } catch (err) {
    console.log("Error in User API: ", err);
  }
};

module.exports = { testUserController };
