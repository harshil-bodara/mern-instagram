const db = require("../config/db");
const { follow, user } = db;

const addFollowRequest = async (req, res) => {
  try {
    const { id } = req.user;
    const addFollow = await follow.create({
      status: "active",
    });
    let addFollows = await addFollow.save();
    return res.status(200).json({
      message: "follow successfully",
      follow: addFollows,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addFollowRequest,
};
