let mongoose = require("mongoose");

const express = require("express");
const router = express.Router();

// Student model
let QuizHistorySchema = require("../models/QuizHistory");
let QuestionSchema = require("../models/Question");
let RankcomparesSchema = require("../models/Rankcompares");
let SuggestionsSchema = require("../models/Suggestions");

router.post("/get-History", async (req, res, next) => {
  const history = await QuizHistorySchema.aggregate([
    {
      $match: {
        user_id: req.body.user_id,
      },
    },
    {
      $lookup: {
        from: "question",
        localField: "Quiz_id",
        foreignField: "_id",
        as: "result",
      },
    },
    {
      $unwind: {
        path: "$result",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        user_id: 1,
        quiz: "$result.quiz",
        score: 1,
        created_at: 1,
      },
    },
  ]);
  return res.json(history);
}),
  router.post("/create-QuizHistory", async (req, res, next) => {
    const quiz = await QuestionSchema.findById(req.body.Quiz_id);
    const ranks = await RankcomparesSchema.findOne({ compares: quiz.rankType });
    const suggestions = await SuggestionsSchema.findOne({ quiz_id: quiz._id });

    let score = 0;
    let scoreListening = 0;
    let scoreSpeaking = 0;
    let scoreWriting = 0;
    let scoreReading = 0;
    let rankType = "";
    let Compares = "";
    let i = 0;
    while (i < quiz.questions.length) {
      if (req.body.options[i] == quiz.questions[i].is_right) {
        score++;
        if (quiz.questions[i].type == "reading") {
          scoreReading++;
        } else if (quiz.questions[i].type == "listening") {
          scoreListening++;
        } else if (quiz.questions[i].type == "writing") {
          scoreWriting++;
        } else if (quiz.questions[i].type == "speaking") {
          scoreSpeaking++;
        } else {
          console.log("error");
        }
      }
      i++;
    }

    if (ranks.compares == quiz.rankType) {
      rankType = quiz.rankType;
    }

    let k = 0;
    while (k < ranks.rank.length) {
      if (
        score >= parseInt(ranks.rank[k].min) &&
        score <= parseInt(ranks.rank[k].max)
      ) {
        Compares = ranks.rank[k].name;
        console.log(parseInt(ranks.rank[k].min), parseInt(ranks.rank[k].max));
      }
      k++;
    }

    QuizHistorySchema.create(
      {
        user_id: req.body.user_id,
        score: score,
        options: req.body.options,
        Quiz_id: req.body.Quiz_id,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json({
            status: "success",
            score: score,
            scoreListening: scoreListening,
            scoreSpeaking: scoreSpeaking,
            scoreWriting: scoreWriting,
            scoreReading: scoreReading,
            rankType: rankType,
            Compares: Compares,
          });
        }
      }
    );
  });

module.exports = router;
