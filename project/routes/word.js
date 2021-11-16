const express = require("express");
const Dict = require("../models/Dictionary");
// const db = require("../config/database");

const router = express.Router();

router.post("/", (req, res) => {
  Dict.findAll({
    where: {
      word: req.body.word,
    },
    attributes: ["word", "wordtype", "definition"],
  })
    .then((dict) => {
      res.send(dict);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
