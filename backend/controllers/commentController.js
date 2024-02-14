const db = require("../config/db");
const { comments, user } = db;

const addComment = async (req, res) => {
  try {
    const { id } = req.user;
    let postId = req.params.postId;
    const { comment } = req.body;
    if (!comment) {
      res.status(404).json({
        message: "Please add comment",
      });
    } else {
      const createComment = await comments.create({
        comment: comment,
        postId: postId,
        userId: id,
      });
      let coments = await createComment.save();
      res.status(200).json({
        message: "Comment created successfully",
        comment: coments,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getComments = async (req, res) => {
  try {
    let postId = req.params.postId;
    let coments = await comments.findAll({
      where: { postId: postId },
    });
    let users = await user.findAll({});
    return res.status(200).send({
      message: "get Comments successfully",
      comment: coments,
      user: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    let commentId = req.params.commentId;
    const deletedComments = await comments.destroy({
      where: {
        id: commentId,
      },
    });
    res.status(200).json({
      message: "Delete comment successfully",
      comment: deletedComments,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};
