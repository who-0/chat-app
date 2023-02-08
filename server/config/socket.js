const Socket = require("socket.io");
const { getUser } = require("../controllers/home.controller");
const activeUsers = new Set();

module.exports = (server) => {
  const io = Socket(server);

  io.on("connection", (socket) => {
    console.log("a user is connected");

    //! New User Connect
    socket.on("new connected",async () => {
      const user = await getUser();
      console.log(user.id)
      socket.userID = user.id;
      activeUsers.add(user);
      io.emit("new user", [...activeUsers]);
    });

    //! New Message
    socket.on("new message", (data) => {
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
