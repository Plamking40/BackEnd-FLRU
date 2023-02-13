let mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

// Student model
let usersSchema = require("../models/Users");

const auth = require("../middleware/auth");

router.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
// Create Student
router.post("/create-users", (req, res, next) => {
  const { user_id, password, firstname, lastname, status, email, tel } =
    req.body;
  usersSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Create Student V.2
router.post("/create-usersv2", async (req, res, next) => {
  try {
    const { user_id, password, firstname, lastname, status, email, tel } =
      req.body;

    if (
      !(user_id && password && firstname && lastname && status && email && tel)
    ) {
      return res.json({
        status: 400,
        msg: "All fields are required",
      });
    }
    const UserRole = await usersSchema.findOne({ user_id: user_id });

    if (UserRole) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await usersSchema.create({
      user_id: user_id,
      firstname: firstname,
      lastname: lastname,
      status: status,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      tel: tel,
    });

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

// Read students
router.get("/", (req, res) => {
  usersSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single student
router.get("/edit-users/:id", (req, res) => {
  usersSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update student
router.put("/update-users/:id", (req, res, next) => {
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
router.delete("/delete-users/:id", (req, res, next) => {
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
router.get("/get-edit-user/:id", async (req, res) => {
  const data = await usersSchema.findOne(
    { _id: req.params.id },
    { password: 0 }
  );
  return res.json(data);
});

// login user
router.post("/login-user", async (req, res) => {
  const username = req.body.user_id;
  const password = req.body.password;

  try {
    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const user = await usersSchema.findOne({ user_id: username });

    if (user && bcrypt.compare(password, user.password)) {
      // Create token
      const token = jwt.sign(
        { user_id: user.user_id, email: user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(401).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

// create post method for Profile
router.get("/profile", auth, async (req, res) => {
  console.log(req.user);
  const user = await usersSchema.findOne(
    { user_id: req.user.user_id },
    { password: 0 }
  );
  return res.json({
    status: 200,
    data: user,
  });
});

//

router.post("/login-profile", async (req, res) => {
  const username = req.body.user_id;
  const data = await usersSchema.findOne(
    { user_id: username },
    { password: 0 }
  );
  return res.json(data);
});

module.exports = router;
