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
    const { id } = req.user;
    let follows = await follow.findAll({
      where:{
        senderId: id
      },
      include: [{
        model : user,
        as: 'id'
      }]
    });
    return res.status(200).send({
      message: "Follow get successfully",
      follower: follows,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addFollowRequest,
  getFollowRequest,
};
