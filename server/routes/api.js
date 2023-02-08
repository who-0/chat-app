const express = require("express");
const homeRouter = require("./home.router");
const loginRouter = require("./login.router");
const signinRouter = require("./signin.router");
const api = express.Router();

api.use("/", homeRouter);
api.use("/signin", signinRouter);
api.use("/login", loginRouter);

module.exports = api;
