const db = require("../config/db");
const { like,user } = db;

const addLike = async (req, res) => {
  try {
    let postId = req.params.postId;
    const createComment = await like.create({
      like: 1,
      postId: postId,
    });
    let likes = await createComment.save();
    res.status(200).json({
      message: "Like created successfully",
      like: likes,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getLikes = async (req, res) => {
  try {
    let postId = req.params.postId;
    let likes = await like.findAll({
      where: { postId: postId },
    });
    let users = await user.findAll({});
    return res.status(200).send({
      message: "get Comments successfully",
      like: likes,
      user: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteLike = async (req, res) => {
  try {
    let likeId = req.params.likeId;
    const deleteLikes = await like.destroy({
      where: {
        id: likeId,
      },
    });
    res.status(200).json({
      message: "Delete like successfully",
      like: deleteLikes,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addLike,
  getLikes,
  deleteLike,
};
