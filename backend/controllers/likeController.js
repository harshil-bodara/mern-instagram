const db = require("../config/db");
const { like } = db;

const addComment = async (req, res) => {
  try {
    let postId = req.params.postId;
    const { comment } = req.body;
    const createComment = await like.create({
      comment: comment,
      postId: postId,
    });
    let comments = await createComment.save();
    res.status(200).json({
      message: "Comment created successfully",
      comment: comments,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getComments = async (req, res) => {
  try {
    let postId = req.params.postId;
    let comments = await like.findAll({
      where: { postId: postId },
    });
    return res.status(200).send({
      message: "Post Comments successfully",
      comment: comments,
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
    const deletedComments = await like.destroy({
      where: {
        id: commentId,
      },
    });
    res.status(200).json({
      message: "Comment delete successfully",
      comment: deletedComments,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { addComment, getComments, deleteComment };
