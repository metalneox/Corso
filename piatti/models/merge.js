const Sequelize = require("sequelize");
const sequelize = require("../lib/db");

//IDDishAllergens	FK_dish	FK_allergen	createdAt	updateAt


const Merge = sequelize.define(
  "dishallergens",
  {
    // attributes
    IDDishAllergens: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    FK_dish: {
      type: Sequelize.STRING
    },
    FK_allergen: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "dishallergens"
  }
);

module.exports = Merge;