const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connection.once("open", () => {
  console.log("Mongodb is connected");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

const mongoConnect = async (MONGO) => {
  await mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const mongoDisconnect = () => {
  mongoose.disconnect();
};

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
