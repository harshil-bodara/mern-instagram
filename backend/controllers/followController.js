const db = require("../config/db");
const { follow, user } = db;

const addFollowRequest = async (req, res) => {
  try {
    const { id } = req.user;
    let allreadyFollow = follow.findAll({
      where: { senderId: id },
    });

    if (allreadyFollow.lenght > 0) {
      res.status(200).json({
        message: "You are allready follow",
      });
    } else {
      const addFollow = await follow.create({
        status: false,
        senderId: id,
        receiverId: req.params.receiverId,
      });
      let addFollows = await addFollow.save();
      return res.status(200).json({
        message: "Follow request send successfully",
        follow: addFollows,
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getFollowRequest = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { id } = req.user;
    const userWithFollowers = await db.user.findByPk(id, {
      include: [
        {
          model: user,
          as: "follower",
          through: "follow",
        },
      ],
    });

    if (!userWithFollowers) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: {
        user: userWithFollowers,
        // followers: userWithFollowers.follower,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateFollowRequest = async (req, res) => {
  try {
    const followId = req.params.id;
    if (!followId) {
      return res.status(400).json({
        message: "Follow ID is required.",
      });
    }
    let [updatedCount, updatedFollows] = await follow.update(
      {
        status: true,
      },
      {
        where: {
          id: followId,
        },
        returning: true,
      }
    );
    if (updatedCount === 0) {
      return res.status(404).json({
        message: "Follow request not found.",
      });
    }
    return res.status(200).json({
      data: {
        message: "Follow request updated successfully.",
        follow: updatedFollows[0],
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteFollowRequest = async (req, res) => {
  try {
    const followId = req.params.id;
    if (!followId) {
      return res.status(400).json({
        message: "Follow ID is required.",
      });
    }
    const deletedCount = await follow.destroy({
      where: {
        id: followId,
      },
    });
    if (deletedCount === 0) {
      return res.status(404).json({
        message: "Follow request not found.",
      });
    }
    return res.status(200).json({
      data: {
        message: "Follow request deleted successfully.",
        follow: followId,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addFollowRequest,
  getFollowRequest,
  updateFollowRequest,
  deleteFollowRequest,
};
