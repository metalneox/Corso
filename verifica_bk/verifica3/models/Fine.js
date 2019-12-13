const Sequelize = require("sequelize");
const sequelize = require("../lib/db");


//id	price	fk_cars	reason	createdAt	updatedAt

const Fine = sequelize.define(
  "fine",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4
    },
    price: {
      type: Sequelize.NUMBER
    },
    fk_cars: {
      type: Sequelize.STRING
    },
    reason: {
      type: Sequelize.TEXT
    }
  },
  {
    tableName: "fine"
  }
);

module.exports = Fine;
