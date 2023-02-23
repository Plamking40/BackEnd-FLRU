let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Courses model
let reserveMiniCoursesSchema = require("../models/ReserveMiniCourses");

router.route("/").get((req, res) => {
  reserveMiniCoursesSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Create Courses
router.route("/create-reserve").post((req, res, next) => {
  reserveMiniCoursesSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

module.exports = router;
