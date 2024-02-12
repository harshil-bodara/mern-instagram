const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("multimedia", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

try {
  sequelize.authenticate();
  console.log("table created successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/userModel.js")(sequelize, DataTypes);
db.post = require("../models/postModel.js")(sequelize, DataTypes);
db.follow = require("../models/followModel.js")(sequelize, DataTypes);

// user to post Relation
db.user.hasMany(db.post, { foreignKey: "userId", as: "post" });
db.post.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
  constraints: true,
  onDelete: "CASCADE",
});

// user to follow Relation
db.user.belongsToMany(db.user, {
  as: "following",
  through: "follow",
  foreignKey: "senderId",
});
db.user.belongsToMany(db.user, {
  as: "follower",
  through: "follow",
  foreignKey: "receiverId",
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("done");
});

module.exports = db;
