const Sequelize = require("sequelize");
const sequelize = require("../lib/db");
const Post = require("./Post");

const User = sequelize.define(
  "users",
  {
    // attributes
    id: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "users"
  }
);

User.hasMany(Post,{foreignKey: 'fk_users'})
module.exports = User;
