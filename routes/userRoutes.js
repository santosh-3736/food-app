const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  passwordResetController,
  deleteUserController,
} = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//get user routes
router.get("/getUser", authMiddleware, getUserController);

// upadte user route
router.put("/updateUser", authMiddleware, updateUserController);

//reset password
router.post("/resetPassword", authMiddleware, passwordResetController);

//update password

router.put("/updatePassword", authMiddleware, updatePasswordController);

router.delete("/deleteUser/:id", authMiddleware, deleteUserController);
module.exports = router;
