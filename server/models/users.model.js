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

const findAllUsers = async () => {
  return await User.find({});
};

const FindaddFriend = async (id, friendID) => {
  console.log("model id", id);
  console.log("model fir", friendID);
  return await User.findOneAndUpdate(
    id,
    { friends: [friendID] },
    { upsert: true, new: true }
  );
};

const reversAddFriend = async (id, friendID) => {
  return await User.findOneAndUpdate(
    id,
    { friends: [friendID] },
    { upsert: true, new: true }
  );
};

module.exports = {
  addNewUser,
  findUser,
  findAllUsers,
  findUserById,
  FindaddFriend,
  reversAddFriend,
};
