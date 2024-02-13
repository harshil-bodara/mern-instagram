const express = require("express");
const router = express.Router();

const {
  addFollowRequest,
  getFollowRequest,
  updateFollowRequest,
  getUserFollowingAndFollowers,
  deleteFollowRequest
} = require("../controllers/followController");
const { userAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/add/:receiverId", userAuthMiddleware, addFollowRequest);
router.get("/:id", userAuthMiddleware, getFollowRequest);
router.put("/update/:id", userAuthMiddleware, updateFollowRequest);
router.get("/followAndFollower/:id", userAuthMiddleware, getUserFollowingAndFollowers);
router.delete("/delete/:id", userAuthMiddleware, deleteFollowRequest);

module.exports = router;
