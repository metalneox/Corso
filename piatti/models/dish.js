const Sequelize = require("sequelize");
const sequelize = require("../lib/db");

//	IDDish	Name	Desc	Price	updateAt	createdAt

const Dish = sequelize.define(
  "dish",
  {
    // attributes
    IDDish: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    Name: {
      type: Sequelize.STRING
    },
    Desc: {
      type: Sequelize.STRING
    },
    Price: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "dish"
  }
);

module.exports = Dish;
