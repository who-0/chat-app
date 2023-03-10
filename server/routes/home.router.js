const express = require("express");
const {
  httpGetHome,
  getUser,
  addFriend,
} = require("../controllers/home.controller");
const verify = require("../middlewares/user_verify.middleware");
const homeRouter = express.Router();

homeRouter.get("/", verify, httpGetHome);
homeRouter.get("/getuser", verify, getUser);
homeRouter.get("/add", verify, addFriend);

// homeRouter.get("/users",verify, (req, res) => {
//   res.status(200).json();
// });

module.exports = homeRouter;
