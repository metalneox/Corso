const Sequelize = require("sequelize");
const sequelize = require("../lib/db");

//id	name	email	password	createdAt	updatedAt
const Ordine = sequelize.define(
  "ordine",
  {
    // attributes
    id: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    billingAddress: {
      type: Sequelize.STRING
    },
    fk_usersord: {
      type: Sequelize.UUIDV4
    },
    fk_item: {
      type: Sequelize.UUIDV4
    }
  },
  {
    tableName: "ordine"
  }
);

module.exports = Ordine;
