const jwt = require("jsonwebtoken");
const { COOKIE_ACCESS } = process.env;
const verify = (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.render("login");
  } else {
    jwt.verify(accessToken, COOKIE_ACCESS, (error, result) => {
      if (error) {
        if (error.message === "jwt expired") {
          res.redirect("/refresh");
        }
      } else {
        req.data = result;
        next();
      }
    });
  }
};

module.exports = verify;
