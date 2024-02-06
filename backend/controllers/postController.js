const db = require("../config/db");
const { post } = db;

const getPosts = async (req, res) => {
  try {
    const { id } = req.user;
    let posts = await post.findAll({
      where: { userId: id },
    });
    return res.status(200).send({
      message: "Post get successfully",
      post: posts,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    let posts = await post.findAll({});
    return res.status(200).send({
      message: "Allpost get successfully",
      post: posts,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const addPosts = async (req, res) => {
  try {
    const { description } = req.body;
    let image = req.file.filename;
    if (!description) {
      throw new Error("All fields are required");
    } else {
      const { id } = req.user;
      const createPost = await post.create({
        description: description,
        image: image,
        userId: id,
      });
      let posts = await createPost.save();
      res.status(200).json({
        message: "post created successfully",
        post: posts,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    let allReadyExistPost = post.findAll({
      where: {
        name: post.name,
      },
    });

    if (allReadyExistPost) {
      let posts = await post.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({
        message: "post delete successfully",
        post: posts,
      });
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message, 
    });
  }
};

module.exports = {
  getPosts,
  getAllPosts,
  addPosts,
  deletePost,
};
