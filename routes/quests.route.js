let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student model
let questsSchema = require("../models/Quests");

router.route("/").get((req, res) => {
  questsSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
