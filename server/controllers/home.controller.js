// const jwt = require("jsonwebtoken");
// const { COOKIE_ACCESS } = process.env;
const {
  FindaddFriend,
  findAllUsers,
  findUserById,
  getStatus,
} = require("../models/users.model");

let userID;
const httpGetHome = async (req, res) => {
  const allUsers = [];
  let currentUser;
  userID = req.data.id;
  const users = await findAllUsers();
  users.forEach((user) => {
    let id = user.id;
    if (userID === id) {
      const { id, username, email, image } = user;
      currentUser = { id, username, email, image };
      return;
    }
    let username = user.username;
    let email = user.email;
    let img = user.image;

    allUsers.push({ id, username, email, img });
  });
  res.render("index", { currentUser, allUsers });
};

const getUser = async (req, res) => {
  const allFriends = [];
  const { id } = req.data;
  const user = await findUserById(id);
  if (user) {
    for (const fid of user.friends) {
      const { id, username, status } = await findUserById(fid);
      allFriends.push({ id, username, status });
    }
  } else {
    return res.status(404).json({
      error: "Your friend is empty",
    });
  }
  return res.status(200).json({
    id,
    allFriends,
  });
};

const addFriend = async (req, res) => {
  const ID = req.url.split("?")[1];
  const e_user = await findUserById(ID);
  if (e_user) {
    userID = req.data.id;
    const updateUser = await FindaddFriend(userID, ID);
    if (updateUser) {
      const friendUser = await FindaddFriend(ID, userID);
      console.log(friendUser);
    }
    return res.status(200).json(updateUser);
  } else {
    return res.status(404).json({
      error: "User not found.",
    });
  }
};

const changeStatus = async (id, status) => {
  const line = await getStatus(id, status);
  console.log(line);
  return line.status;
};

module.exports = {
  httpGetHome,
  getUser,
  addFriend,
  changeStatus,
};
