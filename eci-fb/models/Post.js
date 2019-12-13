const Sequelize = require("sequelize");
const sequelize = require("../lib/db");

const Post = sequelize.define(
  "post",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4
    },
    title: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.TEXT
    }
  },
  {
    tableName: "posts"
  }
);

module.exports = Post;
