const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let QuizHistorySchema = new Schema(
  {
    user_id: String,
    options: Object,
    Quiz_id: mongoose.ObjectId,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    collection: "QuizHistory",
  }
);

module.exports = mongoose.model("QuizHistorySchema", QuizHistorySchema);
