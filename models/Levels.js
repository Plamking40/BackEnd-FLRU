const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let levelsSchema = new Schema(
  {
    id: {
      type: String,
    },
    Name: {
      type: String,
    },
    Exp_max: {
      type: Number,
    },
  },
  {
    collection: "Levels",
  }
);

module.exports = mongoose.model("Levels", levelsSchema);
