const Socket = require("socket.io");
const activeUsers = new Set();

module.exports = (server) => {
  const io = Socket(server);

  io.on("connection", (socket) => {
    console.log("a user is connected");

    //! New User Connect
    socket.on("new user", (data) => {
      socket.userID = data;
      activeUsers.add(data);
      console.log(activeUsers);
    });

    //! User Disconnect
    socket.on("disconnect", () => {
      const user = socket.userID;
      console.log(`${user} is disconnect.`);
      activeUsers.delete(user);
      io.emit("user disconnected", user);
      console.log("new", activeUsers);
    });
  });
};
