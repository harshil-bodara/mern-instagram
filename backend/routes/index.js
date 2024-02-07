const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const postRouter = require("./postRoutes");
const followRouter = require("./followRoutes");

router.use("/user", authRouter);
router.use("/post", postRouter);
router.use("/follow", followRouter);

module.exports = router;
