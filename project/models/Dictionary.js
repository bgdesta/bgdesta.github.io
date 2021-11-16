const Sequelize = require("sequelize");
const db = require("../config/database");

const Entries = db.define("entries", {
  word: {
    type: Sequelize.STRING,
  },
  wordtype: {
    type: Sequelize.STRING,
  },
  definition: {
    type: Sequelize.STRING,
  },
});

module.exports = Entries;
