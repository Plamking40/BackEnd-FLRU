let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Courses model
let coursesSchema = require("../models/Courses");

router.route("/").get((req, res) => {
  coursesSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Create Courses
router.route("/create-courses").post((req, res, next) => {
  coursesSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// Delete Courses
router.route("/delete-courses/:id").delete((req, res, next) => {
  coursesSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

// Get Edit Show Data
router.route("/get-edit-courses/:id").get(async (req, res) => {
  console.log(req.params.id);
  const data = await coursesSchema.findOne({ _id: req.params.id });
  return res.json(data);
});

// Update student
router.route("/update-courses/:id").put((req, res, next) => {
  if (req.body.courses_id == "") {
    return res.json({
      status: 400,
      msg: "First Name is required",
    });
  }
  if (req.body.title == "") {
    return res.json({
      status: 400,
      msg: "Last Name is required",
    });
  }
  if (req.body.detail == "") {
    return res.json({
      status: 400,
      msg: "Status is required",
    });
  }
  if (req.body.is_active == "") {
    return res.json({
      status: 400,
      msg: "Status is required",
    });
  }
  coursesSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        courses_id: req.body.courses_id,
        title: req.body.title,
        detail: req.body.detail,
        is_active: req.body.is_active,
      },
    },
    (error) => {
      if (error) {
        return next(error);
      } else {
        res.json({ status: 200, msg: "Users updated successfully" });
      }
    }
  );
});

module.exports = router;
