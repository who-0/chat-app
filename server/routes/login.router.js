const express = require("express");
const {
  httpGetLogin,
  httpPostLogin,
} = require("../controllers/login.controller");
const loginRouter = express.Router();

loginRouter.get("/", httpGetLogin);
loginRouter.post("/", httpPostLogin);

module.exports = loginRouter;
