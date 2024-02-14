const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const { DataTypes } = Sequelize;

  const commentScheme = sequelize.define("comment", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return commentScheme;
};
