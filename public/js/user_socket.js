const socket = io();
const userForm = document.getElementById("user_form");
const userInput = document.getElementById("user_message");
const activeUsers = document.getElementById("active_users");
const msgHistory = document.getElementById("message_history");
const typing = document.getElementById("user_typing");
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
  const userData = userInput.value || null;
  if (!userData) {
    return;
  }
  socket.emit("new message", userData);
  userInput.value = "";
});

function addMessage({ userID, message }) {
  const current_time = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const incomingMsg = `
    <div className="incoming_message">
      <p>${message}</p>
      <div className="user_id">
        <span>${userID}</span>
      </div>
    </div>
  `;

  const outgoingMsg = `
  <div className="outgoing_message">
    <p>${message}</p>
    <div className="time">
      <span>${current_time}</span>
    </div>
  </div>
  `;

  msgHistory.innerHTML += userID === email ? outgoingMsg : incomingMsg;
}

socket.on("message", function (data) {
  addMessage({ userID: data.id, message: data.message });
  typing.innerHTML = "";
});

userInput.addEventListener("keyup", function () {
  socket.emit("typing", { isTyping: userInput.value.length > 0 });
});

socket.on("user typing", function (data) {
  if (!data) {
    typing.innerHTML = "";
  }
  typing.innerHTML = `<p>Typing...</p>`;
});

//! User Disconnect
socket.on("user disconnected", function (data) {
  document.querySelector(`.${data}-user`).remove();
});
