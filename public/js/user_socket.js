const socket = io();
const userForm = document.getElementById("user_form");
const userInput = document.getElementById("user_message");
const activeUsers = document.getElementById("active_users");
let email;

//! New User Connect
(function (user) {
  email = user || `User${Math.floor(Math.random() * 10000)}`;
  socket.emit("new connected", email);
  addUser(email);
})();

function addUser(email) {
  const e_user = document.querySelector(`.${email}-user`) || null;
  if (!!e_user) {
    return;
  }
  const userBox = `<div class='${email}-user'><h5>${email}</h5></div>`;
  activeUsers.innerHTML += userBox;
}

socket.on("new user", function (data) {
  data.map((i) => addUser(i));
});

//! New Message
userForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userData = userInput.value;
  socket.emit("new message", userData);
});

socket.on("message", function (data) {
  console.log("this is from server to client", data);
});

userInput.addEventListener("keyup", function () {
  socket.emit("typing", { message: "typing" });
});

socket.on("user typing", function (data) {
  console.log(data);
});

//! User Disconnect
socket.on("user disconnected", function (data) {
  document.querySelector(`.${data}-user`).remove();
});
