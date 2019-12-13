const Sequelize = require("sequelize");
const sequelize = require("../lib/db");
const Fine = require("./Fine");

//id	plate	model createdAt	updatedAt


const Car = sequelize.define(
  "car",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4
    },
    plate: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.TEXT
    }
  },
  {
    tableName: "cars"
  }
);

Car.hasMany(Fine,{foreignKey: 'fk_cars'})
module.exports = Car;
