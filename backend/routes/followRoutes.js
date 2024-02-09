const express = require("express");
const router = express.Router();

const {
  addFollowRequest,
  getFollowRequest,
} = require("../controllers/followController");
const { userAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/add/:followingId", userAuthMiddleware, addFollowRequest);
router.get("/", userAuthMiddleware, getFollowRequest);

module.exports = router;
