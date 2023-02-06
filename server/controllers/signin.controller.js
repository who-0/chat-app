const bcrypt = require("bcryptjs");
const { addNewUser, findUser } = require("../models/users.model");
const httpGetSignIn = (req, res) => {
  res.render("signin");
};

const httpPostSignIn = async (req, res) => {
  const { uname, email, pwd } = req.body;
  const oldUser = await findUser(email);
  if (oldUser) {
    return res.status(200).json(oldUser);
  } else if (!uname || !email || !pwd) {
    return res.status(400).json({
      error: "You miss something",
    });
  } else {
    const password = await bcrypt.hash(pwd, 8);
    const data = {
      username: uname,
      password,
      email,
    };
    const newUser = await addNewUser(data);
    if (!newUser) {
      return res.status(400).json({
        error: "Your data is not defined",
      });
    } else {
      return res.status(200).json(newUser);
    }
  }
};

module.exports = {
  httpPostSignIn,
  httpGetSignIn,
};
