const express = require("express");

const {
  httpPostSignIn,
  httpGetSignIn,
} = require("../controllers/signin.controller");
const signinRouter = express.Router();

signinRouter.get("/", httpGetSignIn);

signinRouter.post("/", httpPostSignIn);

module.exports = signinRouter;
