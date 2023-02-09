const Socket = require("socket.io");
const { getUser } = require("../controllers/home.controller");
const activeUsers = new Set();

module.exports = (server) => {
  const io = Socket(server);

  io.on("connection", (socket) => {
    console.log("a user is connected");

    //! New User Connect
    socket.on("new connected", (user) => {
      // const user = await getUser();
      socket.userID = user.id;
      console.log("userid", socket.userID);
      activeUsers.add(user);
      console.log("acitve user", activeUsers);
      io.emit("new user", [...activeUsers]);
    });

    //! New Message
    socket.on("new message", async (data) => {
      console.log({ id: socket.userID, data });
      io.emit("message", { id: socket.userID, message: data });
    });

    socket.on("typing", (data) => {
      socket.broadcast.emit("user typing", data);
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
