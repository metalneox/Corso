const Sequelize = require("sequelize");
const sequelize = require("../lib/db");
const Fine = require("./Fine");
const Car = sequelize.define(
  "car",
  {
    plate: {
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    model: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "cars"
  }
);

Car.hasMany(Fine, {
  foreignKey: "carPlate"
});
Fine.belongsTo(Car, {
  foreignKey: "carPlate"
});

module.exports = Car;
