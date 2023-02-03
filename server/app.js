const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

//! middlewares ----
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", methods: ["get", "post"] }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render("index");
});

module.exports = app;
