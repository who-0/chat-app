const socket = io();
let email;

//! New User Connect
(function (user) {
  email = user || `User@${Math.floor(Math.random() * 10000)}`;
  socket.emit("new user", email);
})();

//! User Disconnect
socket.on("user disconnected", function (data) {
  console.log(`${data} is connected...`);
});
