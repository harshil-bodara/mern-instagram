const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const { DataTypes } = Sequelize;

  const followryScheme = sequelize.define("follow", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return followryScheme;
};
