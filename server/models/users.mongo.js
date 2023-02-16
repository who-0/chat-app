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
    default: "/img/user-icon.png",
  },
  email: {
    type: String,
    require: true,
  },
  friends: [String],
  status: {
    type: String,
    default: "offline",
  },
});

module.exports = mongoose.model("Users", userSchema);
