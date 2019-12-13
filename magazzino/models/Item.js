const Sequelize = require("sequelize");
const sequelize = require("../lib/db");

//id	name	email	password	createdAt	updatedAt
const Item = sequelize.define(
  "item",
  {
    // attributes
    id: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "item"
  }
);

module.exports = Item;
