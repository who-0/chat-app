// const jwt = require("jsonwebtoken");
// const { COOKIE_ACCESS } = process.env;
// const { findUserById } = require("../models/users.model");

let userID;
const httpGetHome = (req, res) => {
  userID = req.data.id;
  console.log(userID);
  res.render("index");
};

const getUser = (req, res) => {
  const { username, id } = req.data;
  console.log("server", req.data);
  return res.status(200).json({
    username,
    id,
  });
};

module.exports = {
  httpGetHome,
  getUser,
};
