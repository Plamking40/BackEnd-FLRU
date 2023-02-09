let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student model
let rankcomparesSchema = require("../models/Rankcompares");

router.route("/").get((req, res) => {
  rankcomparesSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/edit-compares/:id").get((req, res) => {
  rankcomparesSchema.findOne({ name: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
