const Sequelize = require("sequelize");
const sequelize = require("../lib/db");
const Post = require("./Post");
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
    }
  },
  {
    tableName: "users"
  }
);

User.hasMany(Post, {
  foreignKey: "userId"
});

module.exports = User;
