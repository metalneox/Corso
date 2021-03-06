const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    dialect:
      process.env
        .DB_DIALECT /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  }
);

module.exports = sequelize;