const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const { DataTypes } = Sequelize;

  const likeScheme = sequelize.define("like", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  return likeScheme;
};
