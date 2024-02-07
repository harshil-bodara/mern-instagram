const express = require("express");
const router = express.Router();

const { addFollowRequest } = require("../controllers/followController");
const { userAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/add",userAuthMiddleware, addFollowRequest);

module.exports = router;