const socket = io();
const userForm = document.getElementById("user_form");
const userInput = document.getElementById("user_message");
const activeUsers = document.getElementById("active_users");
const msgHistory = document.getElementById("message_history");
const typing = document.getElementById("user_typing");
let userid;

//! New User Connect
(async function () {
  const user = await fetch("http://localhost:3000/getuser").then((res) =>
    res.json()
  );
  console.log(user);
  socket.emit("new connected", user);
  addUser(user);
})();

function addUser(user) {
  userid = user.id;
  console.log(userid);
  console.log("client", userid);
  const e_user = document.getElementById(`${userid}`) || null;
  if (!!e_user) {
    return;
  }
  const userBox = `
  <div class='current_user' id=${userid} >
  <img src="/img/user-icon.png" alt="user-icon" width="40">
    <p id=${userid}username>${user.username}</p>
    <span class="connection online"></span>
  </div>`;
  activeUsers.innerHTML += userBox;
}

socket.on("new user", function (data) {
  data.map((i) => addUser(i));
});

//! New Message
userForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById(`${userid}username`).innerText;
  const userData = userInput.value || null;
  if (!userData) {
    return;
  }
  const data = {
    username,
    userData,
  };
  socket.emit("new message", data);
  userInput.value = "";
});

function addMessage({ username, id, message }) {
  const current_time = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const incomingMsg = `
<div class="chat_incoming">
  <div class="incoming_message">
      <p>${message}</p>
      <div className="user_id">
          <span>${username}</span>
      </div>
  </div>
</div>
  `;

  const outgoingMsg = `
<div class="chat_outgoing">
  <div class="outgoing_message">
      <p>${message}</p>
      <div className="time">
          <span>${current_time}</span>
      </div>
  </div>
</div>
  `;
  console.log(userid);
  console.log(id);
  console.log(id === userid);
  msgHistory.innerHTML += id === userid ? outgoingMsg : incomingMsg;
}

socket.on("message", function (data) {
  addMessage({ id: data.id, username: data.username, message: data.message });
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
