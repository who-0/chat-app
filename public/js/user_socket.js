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

  userid = user.id;
  socket.emit("new connected", user);
  addUser(user);
})();

function addUser(user) {
  const e_user = document.getElementById(`${userid}`) || null;
  if (userid == user.id && e_user) {
    return;
  }
  const userBox = `
  <div class='current_user' id=${user.id} >
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
  socket.emit("typing", { isTyping: false });
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
  // console.log(id === userid);
  msgHistory.innerHTML += id === userid ? outgoingMsg : incomingMsg;
}

socket.on("message", function (data) {
  addMessage({
    id: data.id,
    username: data.message.username,
    message: data.message.userData,
  });
  // console.log(typing);
  // socket.emit("typing", false);
  // typing.innerHTML = "";
});

userInput.addEventListener("keyup", function () {
  console.log("keyup", userInput.value.length > 0);
  socket.emit("typing", { isTyping: userInput.value.length > 0 });
});

socket.on("user typing", function (data) {
  if (!data.isTyping) {
    typing.innerHTML = "";
  } else {
    typing.innerHTML = `<p>Typing...</p>`;
  }
});

//! User Disconnect
socket.on("user disconnected", function (data) {
  console.log(data);
  const exist_user = document.getElementById(`${data}`);
  console.log(exist_user);
  exist_user.remove();
});
