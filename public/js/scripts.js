const profile = document.getElementById("profile_img");
const profileMenu = document.getElementById("profile_menu");
profile.addEventListener("click", function () {
  console.log(profileMenu);
  profileMenu.classList.toggle("hidden");
  profileMenu.classList.toggle("show");
});
