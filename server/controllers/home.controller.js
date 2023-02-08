const { findUserById } = require("../models/users.model");

let userID;
const httpGetHome = (req, res) => {
    userID = req.data.id;
    console.log(userID)
    res.render("index");
}

const getUser = async () => {
    console.log(userID)
    return await findUserById(userID);
}
  
module.exports = {
    httpGetHome,
    getUser,
}