const Sequelize = require("sequelize");
const sequelize = require("../lib/db");
const Car = require("./Car")
//email	password	firstName	lastName	role	createdAt	updatedAt

const User = sequelize.define(
  "user",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    role:{
      type: Sequelize.STRING
    }
  },
  {
    tableName: "users"
  }
);
User.hasMany(Car,{foreignKey: 'fk_users'})
module.exports = User;
