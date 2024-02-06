const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const postRouter = require("./postRoutes")

router.use("/user", authRouter);
router.use("/post", postRouter);

module.exports = router;
