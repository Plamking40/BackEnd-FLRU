const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let signinoutSchema = new Schema(
  {
    user_id: String,
    status: String,
    timestamp: { type: Date, default: Date.now },
  },
  {
    collection: "signinout",
  }
);

module.exports = mongoose.model("sigminout", signinoutSchema);
