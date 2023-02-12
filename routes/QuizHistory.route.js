let mongoose = require("mongoose");

const express = require("express");
const router = express.Router();

// Student model
let QuizHistorySchema = require("../models/QuizHistory");
let QuestionSchema = require("../models/Question");
let RankcomparesSchema = require("../models/Rankcompares");

router.post("/create-QuizHistory", async (req, res, next) => {
  const quiz = await QuestionSchema.findById(req.body.Quiz_id);
  const ranks = await RankcomparesSchema.findOne({ compares: quiz.rankType });

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

  QuizHistorySchema.create(req.body, (error, data) => {
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
  });
});

module.exports = router;
