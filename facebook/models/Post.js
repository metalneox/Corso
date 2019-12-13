const Sequelize = require("sequelize");
const sequelize = require("../lib/db");


//id	title	text	fk_users	createdAt	updatedAt	deleteAt

const Post = sequelize.define(
  "posts",
  {
    // attributes
    id: {
      primaryKey: true,
      type: Sequelize.UUIDV4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    title: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.STRING
    },
    fk_users: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: "posts"
  }
);

module.exports = Post;