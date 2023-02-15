const profile = document.getElementById("profile_img");
const profileMenu = document.getElementById("profile_menu");
const overlay = document.getElementById("overlay");
const addContainer = document.getElementById("add_container");
const addFriend = document.getElementById("add_friend");

//! Profile Action -------------------------------
profile.addEventListener("click", function () {
  console.log(profileMenu);
  profileMenu.classList.toggle("hidden");
  profileMenu.classList.toggle("show");
});

//! Add Friend Action ------------------------------

addFriend.addEventListener("click", function () {
  overlay.classList.remove("hidden_overlay");
  addContainer.classList.remove("hidden_addcontainer");
  overlay.classList.add("show_overlay");
  addContainer.classList.add("show_addcontainer");
});

overlay.addEventListener("click", function () {
  overlay.classList.remove("show_overlay");
  addContainer.classList.remove("show_addcontainer");
  overlay.classList.add("hidden_overlay");
  addContainer.classList.add("hidden_addcontainer");
});
