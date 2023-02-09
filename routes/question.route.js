let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student model
let questionSchema = require("../models/Question");

// Create Student
router.route("/create-question").post((req, res, next) => {
  questionSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.route("/").get((req, res) => {
  questionSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/QuizUser").get(async (req, res) => {
  const data = await questionSchema.aggregate([
    {
      $project: {
        _id: 1,
        quiz: 1,
        type: 1,
        content: 1,
        totol: 1,
        score_max: 1,
      },
    },
  ]);
  console.log(data);
  return res.json(data);
});

// Get single student
router.route("/edit-question/:id").get((req, res) => {
  questionSchema.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// AllQuiz
router.route("/AllQuiz").get(async (req, res) => {
  const data = await questionSchema.find(
    {},
    {
      quiz: 1,
      type: 1,
    }
  );
  console.log(data);
  return res.json(data);
});

// StartQuizs
router.route("/StartQuizs/:id").get(async (req, res) => {
  const data = await questionSchema.findOne(
    { _id: req.params.id },
    {
      quiz: 0,
      type: 0,
      score_max: 0,
      content: 0,
      "questions.is_right": 0,
      "questions.Created_at": 0,
      "questions.Updated_at": 0,
      "questions.score": 0,
    }
  );
  return res.json(data);
});
module.exports = router;
