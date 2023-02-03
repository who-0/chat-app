const Socket = require("socket.io");
const activeUsers = new Set();

module.exports = (server) => {
  const io = Socket(server);

  io.on("connection", (socket) => {
    console.log("a user is connected");

    //! New User Connect
    socket.on("new connected", (data) => {
      socket.userID = data;
      activeUsers.add(data);
      console.log(activeUsers);
      io.emit("new user", [...activeUsers]);
    });

    //! New Message
    socket.on("new message", (data) => {
      console.log(data);
      socket.emit("message", data);
    });

    socket.on("typing", (data) => {
      socket.emit("user typing", data);
    });

    //! User Disconnect
    socket.on("disconnect", () => {
      const user = socket.userID;
      activeUsers.delete(user);
      io.emit("user disconnected", user);
      console.log("new", activeUsers);
    });
  });
};
