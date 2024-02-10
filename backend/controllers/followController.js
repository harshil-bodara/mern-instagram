const db = require("../config/db");
const { follow, user } = db;

const addFollowRequest = async (req, res) => {
  try {
    const { id } = req.user;
    const addFollow = await follow.create({
      status: false,
      senderId: id,
      receivId: req.params.followingId,
    });
    let addFollows = await addFollow.save();
    return res.status(200).json({
      message: "Follow successfully",
      follow: addFollows,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getFollowRequest = async (req, res) => {
  try {
    let users = await user.findAll({
      where: { id: req.params.id },
    });
    return res.status(200).send({
      message: "User get successfully",
      user: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const updateFollowRequest = async (req, res) => {
  try {
    let followUpdate = await follow.update(
      {
        status: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.status(200).send({
      message: "Follow update successfully",
      follow: followUpdate,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteFollowRequest = async (req, res) => {
  try {
    let followDelete = await follow.destroy(
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log('followDelete===>', followDelete);
    return res.status(200).send({
      message: "Follow delete successfully",
      follow: followDelete,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = {
  addFollowRequest,
  getFollowRequest,
  updateFollowRequest,
  deleteFollowRequest
};
