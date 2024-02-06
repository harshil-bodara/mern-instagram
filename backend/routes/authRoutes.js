const express = require("express");
const router = express.Router();
const uploads = require("../utils/createMulter");
const {
  registerUser,
  loginUser,
  getUser,
  resetPassword,
  forgotPassword,
} = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/register", uploads.single("profile"), registerUser);
router.get("/", getUser);
router.post("/resetPassword", resetPassword);
router.post("/forgotPassword", forgotPassword);

module.exports = router;
