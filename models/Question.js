const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let questionSchema = new Schema(
  {
    quiz: {
      type: String,
    },
    type: {
      type: String,
    },
    score_max: {
      type: Number,
    },
    is_active: {
      type: Boolean,
    },
    end_time: {
      type: Number,
    },
    total: {
      type: Number,
    },
    content: {
      type: String,
    },
    rankType: {
      type: String,
    },
  },
  {
    collection: "question",
  }
);

module.exports = mongoose.model("Question", questionSchema);
