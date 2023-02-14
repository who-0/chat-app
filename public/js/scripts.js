const profile = document.getElementById("profile_img");
const profileMenu = document.getElementById("profile_menu");
const frinend = document.getElementById("friends_container");
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
  frinend.classList.remove("hidden_friend");
  addContainer.classList.remove("hidden_addcontainer");
  frinend.classList.add("show_friend");
  addContainer.classList.add("show_addcontainer");
});

frinend.addEventListener("click", function () {
  frinend.classList.remove("show_friend");
  addContainer.classList.remove("show_addContainer");
  frinend.classList.add("hidden_friend");
  addContainer.classList.add("hidden_addContainer");
});
