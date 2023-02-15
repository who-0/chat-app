// const jwt = require("jsonwebtoken");
// const { COOKIE_ACCESS } = process.env;
const {
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

const getUser = async (req, res) => {
  const allFriends = [];
  const { id } = req.data;
  const { friends } = await findUserById(id);
  friends.forEach(async (friend) => {
    const f = await findUserById(friend);
    console.log("f", f);
    allFriends.push({
      id: f.id,
      username: f.username,
    });
  });
  console.log("allfirends", allFriends);
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

module.exports = {
  httpGetHome,
  getUser,
  addFriend,
};
