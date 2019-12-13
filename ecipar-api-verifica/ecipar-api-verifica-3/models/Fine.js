const Sequelize = require("sequelize");
const sequelize = require("../lib/db");

const Fine = sequelize.define(
  "fine",
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    price: {
      type: Sequelize.DOUBLE
    },
    reason: {
      type: Sequelize.TEXT
    }
  },
  {
    tableName: "fines"
  }
);

module.exports = Fine;
