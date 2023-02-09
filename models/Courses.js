const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let coursesSchema = new Schema(
  {
    courses_id: {
      type: String,
    },
    title: {
      type: String,
    },
    detail: {
      type: String,
    },
    is_active: {
      type: Boolean,
    },
  },
  {
    collection: "courses",
  }
);

module.exports = mongoose.model("Courses", coursesSchema);
