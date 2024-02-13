const express = require("express");
const router = express.Router();

const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/likeController");
const { userAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/add/:postId", userAuthMiddleware, addComment);
router.get("/:postId", userAuthMiddleware, getComments);
router.delete("/delete/:commentId", userAuthMiddleware, deleteComment);

module.exports = router;
