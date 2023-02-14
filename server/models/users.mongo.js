const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "default",
  },
  email: {
    type: String,
    require: true,
  },
  friends: [String],
});

module.exports = mongoose.model("Users", userSchema);
