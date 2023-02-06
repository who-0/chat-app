const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
//! Require
const api = require("./routes/api");
//! middlewares ----

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: { "script-src": ["'self'"], "style-src": null },
//   })
// );
// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       // "script-src": ["'self'", "'unsafe-inline'", "googleusercontent.com"],
//       "img-src": ["'self'", "https: data:"],
//     },
//   })
// );
app.use(cors({ origin: "http://localhost:3000", methods: ["get", "post"] }));
app.use(morgan("tiny"));
app.use(api);

module.exports = app;
