let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student model
let levelsSchema = require("../models/Levels");

router.route("/").get((req, res) => {
  levelsSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
