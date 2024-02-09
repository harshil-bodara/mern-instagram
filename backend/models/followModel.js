const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const { DataTypes } = Sequelize;

  const followScheme = sequelize.define("follow", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
  },
  });
  return followScheme;
};
