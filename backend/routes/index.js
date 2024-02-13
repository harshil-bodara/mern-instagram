const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const postRouter = require("./postRoutes");
const followRouter = require("./followRoutes");
const likeRouter = require("./likeRoutes");

router.use("/user", authRouter);
router.use("/post", postRouter);
router.use("/follow", followRouter);
router.use("/like", likeRouter);

module.exports = router;
