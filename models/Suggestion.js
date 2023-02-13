const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SuggestionSchema = new Schema(
  {
    quiz_id: mongoose.ObjectId,
    type: String,
    max: Number,
    min: Number,
    criterion: String,
    suggestion: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    collection: "Suggestion",
  }
);

module.exports = mongoose.model("Suggestion", SuggestionSchema);
