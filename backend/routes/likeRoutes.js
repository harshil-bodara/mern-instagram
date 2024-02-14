const express = require("express");
const router = express.Router();

const {
  addLike,
  getLikes,
  deleteLike,
} = require("../controllers/likeController");
const { userAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/add/:postId", userAuthMiddleware, addLike);
router.get("/:postId", userAuthMiddleware, getLikes);
router.delete("/delete/:likeId", userAuthMiddleware, deleteLike);

module.exports = router;
