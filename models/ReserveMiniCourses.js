const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reserveMiniCoursesSchema = new Schema(
  {
    userID: {
      type: String,
    },
    MiniID: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "ReserveMiniCourses",
  }
);

module.exports = mongoose.model("ReserveMiniCourses", reserveMiniCoursesSchema);
