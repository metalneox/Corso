const Sequelize = require("sequelize");
const sequelize = require("../lib/db");

const User = sequelize.define(
  "user",
  {
    id: {
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUIDV4,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "users"
  }
);

module.exports = User;
