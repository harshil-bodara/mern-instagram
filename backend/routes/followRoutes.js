const express = require("express");
const router = express.Router();

const {
  addFollowRequest,
  getFollowRequest,
  updateFollowRequest,
  deleteFollowRequest
} = require("../controllers/followController");
const { userAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/add/:followingId", userAuthMiddleware, addFollowRequest);
router.get("/:id", userAuthMiddleware, getFollowRequest);
router.put("/update/:id", userAuthMiddleware, updateFollowRequest);
router.delete("/delete/:id", userAuthMiddleware, deleteFollowRequest);

module.exports = router;
