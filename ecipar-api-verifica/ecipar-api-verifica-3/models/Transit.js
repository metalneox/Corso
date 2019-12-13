const Sequelize = require("sequelize");
const sequelize = require("../lib/db");
const Car = require("./Car");
const Transit = sequelize.define(
  "transit",
  {
    id: {
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false
    },
    tutorId: {
      type: Sequelize.INTEGER
    },
    carPlate: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "transits"
  }
);

Car.hasOne(Transit);
Transit.belongsTo(Car);
module.exports = Transit;
