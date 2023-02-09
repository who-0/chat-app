const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { COOKIE_ACCESS, COOKIE_REFRESH } = process.env;
const { findUser } = require("../models/users.model");

const httpGetLogin = (req, res) => {
  res.render("login");
};

const httpPostLogin = async (req, res) => {
  const { email, pwd } = req.body;
  const foundUser = await findUser(email);
  console.log(foundUser);
  if (!foundUser) {
    res.status(400).json({
      error: "Not Found User",
    });
  } else {
    const check = bcrypt.compare(pwd, foundUser.password);
    if (!check) {
      res.status(404).json({
        error: "Password is incorrect",
      });
    } else {
      const accessToken = jwt.sign(
        {
          email: foundUser.email,
          username: foundUser.username,
          id: foundUser.id,
        },
        COOKIE_ACCESS,
        { expiresIn: "1m" }
      );
      const refreshToken = jwt.sign(
        {
          email: foundUser.email,
          username: foundUser.username,
          id: foundUser._id,
        },
        COOKIE_REFRESH
      );
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.redirect("/");
    }
  }
};

module.exports = {
  httpGetLogin,
  httpPostLogin,
};
