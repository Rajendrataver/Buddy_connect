const hamburger = document.getElementById("hamburger-icon");
const closHamburger = document.getElementById("close-menu-icon");
const menu = document.getElementById("links");
const body = document.querySelector("body");

console.log("hamburger", hamburger);

const toggelchange = () => {

  $("#links").toggel(1000);
};
body.addEventListener("wheel");
hamburger.addEventListener("click", toggelchange);
