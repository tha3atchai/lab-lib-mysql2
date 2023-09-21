const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/", userController.updateUser);

module.exports = router;