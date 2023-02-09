let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student model
let usersSchema = require("../models/Users");

// Create Student
router.route("/create-users").post((req, res, next) => {
  // res.json({ msg: "Data Saved Successfully...." });
  usersSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// Read students
router.route("/").get((req, res) => {
  usersSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single student
router.route("/edit-users/:id").get((req, res) => {
  usersSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update student
router.route("/update-users/:id").put((req, res, next) => {
  if (req.body.firstname == "") {
    return res.json({
      status: 400,
      msg: "First Name is required",
    });
  }
  if (req.body.lastname == "") {
    return res.json({
      status: 400,
      msg: "Last Name is required",
    });
  }
  if (req.body.status == "") {
    return res.json({
      status: 400,
      msg: "Status is required",
    });
  }
  if (req.body.email == "") {
    return res.json({
      status: 400,
      msg: "Email is required",
    });
  }
  if (req.body.tel == "") {
    return res.json({
      status: 400,
      msg: "Tel is required",
    });
  }
  usersSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        status: req.body.status,
        email: req.body.email,
        tel: req.body.tel,
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

// Delete student
router.route("/delete-users/:id").delete((req, res, next) => {
  usersSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
router.route("/get-edit-user/:id").get(async (req, res) => {
  const data = await usersSchema.findOne(
    { _id: req.params.id },
    { password: 0 }
  );
  return res.json(data);
});

// login user
router.route("/login-user").get(async (req, res) => {
  // console.log(req.body.user_id + " " + req.body.password);
  // await usersSchema.findOne({
  //   user_id: req.body.user_id,
  //   password: req.body.password,
  // });
  return res.json({ mes: "success" });
});

module.exports = router;
