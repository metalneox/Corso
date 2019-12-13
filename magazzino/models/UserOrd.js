const Sequelize = require("sequelize");
const sequelize = require("../lib/db");

const Ordine = require("./Ordine");
const User = require("./Users");

//id	name	email	password	createdAt	updatedAt
const UsersOrd = sequelize.define(
  "usersord",
  {
    // attributes
    id: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    fk_ord: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "usersord"
  }
);

module.exports = UsersOrd;
//User.belongsToMany(Ordine, { through: UsersOrd });
//Ordine.belongsToMany(User, { through: UsersOrd });