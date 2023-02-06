const express = require("express");
const homeRouter = require("./home.router");
const signinRouter = require("./signin.router");
const api = express.Router();

api.use("/", homeRouter);
api.use("/signin", signinRouter);

module.exports = api;
