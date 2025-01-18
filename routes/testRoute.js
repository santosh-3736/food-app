const express = require("express");
const { testUserController } = require("../controller/testController");

const router = express.Router(); // express router

router.get("/test-user", testUserController);

module.exports = router;
