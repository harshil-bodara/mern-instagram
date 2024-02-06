const express = require("express");
const router = express.Router();
const uploads = require("../utils/createMulter");

const {
  getPosts,
  getAllPosts,
  addPosts,
  deletePost,
} = require("../controllers/postController");

const { userAuthMiddleware } = require("../middlewares/authMiddleware");

router.get("/", userAuthMiddleware, getPosts);
router.get("/all", userAuthMiddleware, getAllPosts);
router.post("/add", uploads.single("image"), userAuthMiddleware, addPosts);
router.delete("/delete/:id", userAuthMiddleware, deletePost);

module.exports = router;
