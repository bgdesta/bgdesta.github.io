const Sequelize = require("sequelize");

const DB_NAME = "entries";
const DB_USER = "wap";
const DB_PASSWORD = "q1w2e3r4t5";

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
