let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student model
let signinoutSchema = require("../models/SignInOut");

router.route("/").get((req, res) => {
  signinoutSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/create-signinout").post((req, res, next) => {
  signinoutSchema.create(
    {
      user_id: req.body.user_id,
      timestamp: req.body.timestamp,
      status: req.body.status,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

module.exports = router;
