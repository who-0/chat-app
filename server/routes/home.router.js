const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.render("index");
});

homeRouter.get("/users", (req, res) => {
  res.status(200).json();
});

module.exports = homeRouter;
