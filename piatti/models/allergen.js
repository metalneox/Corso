const Sequelize = require("sequelize");
const sequelize = require("../lib/db");

const Allergen = sequelize.define(
  "allergen",
  {
    // attributes
    IDAllergen: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    Name: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "allergen"
  }
);

module.exports = Allergen;
