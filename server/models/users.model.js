const User = require("./users.mongo");
const addNewUser = async (data) => {
  console.log(data);
  return await User.findOneAndUpdate({ email: data.email }, data, {
    upsert: true,
    new: true,
  });
};

const findUser = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (userID) => {
  return await User.findById(userID);
};

module.exports = {
  addNewUser,
  findUser,
  findUserById,
};
