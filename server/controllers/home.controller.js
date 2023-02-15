// const jwt = require("jsonwebtoken");
// const { COOKIE_ACCESS } = process.env;
const {
  reversAddFriend,
  FindaddFriend,
  findAllUsers,
  findUserById,
} = require("../models/users.model");

let userID;
const httpGetHome = async (req, res) => {
  const allUsers = [];
  userID = req.data.id;
  const users = await findAllUsers();
  users.forEach((user) => {
    let id = user.id;
    if (userID === id) {
      return;
    }
    let username = user.username;
    let email = user.email;
    let img = user.image;
    allUsers.push({ id, username, email, img });
  });
  res.render("index", { allUsers });
};

const getUser = (req, res) => {
  const { username, id } = req.data;
  console.log("server", req.data);
  return res.status(200).json({
    username,
    id,
  });
};

const addFriend = async (req, res) => {
  const ID = req.url.split("?")[1];
  const e_user = await findUserById(ID);
  if (e_user) {
    userID = req.data.id;
    const updateUser = await FindaddFriend(userID, ID);
    if (updateUser) {
      const friendUser = await reversAddFriend(ID, userID);
      console.log(friendUser);
    }
    return res.status(200).json(updateUser);
  } else {
    return res.status(404).json({
      error: "User not found.",
    });
  }
};

module.exports = {
  httpGetHome,
  getUser,
  addFriend,
};
