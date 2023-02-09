const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let questsSchema = new Schema(
  {
    id: {
      type: String,
    },
    Name: {
      type: String,
    },
    Exp: {
      type: Number,
    },
  },
  {
    collection: "quests",
  }
);

module.exports = mongoose.model("Quests", questsSchema);
