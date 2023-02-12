const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let rankcomparesSchema = new Schema(
  {
    compares: {
      type: String,
    },
    rank: [
      {
        name: { type: String },
        min: { type: String },
        max: { type: String },
      },
    ],
  },
  {
    collection: "rank_compares",
  }
);

module.exports = mongoose.model("RankcomparesSchema", rankcomparesSchema);
