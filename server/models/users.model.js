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

module.exports = {
  addNewUser,
  findUser,
};
