const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usersSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    password: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    status: {
      type: String,
    },
    email: {
      type: String,
    },
    tel: {
      type: String,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("Users", usersSchema);
