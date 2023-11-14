document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenuButton = document.querySelector(".hamburger-menu");
  const overlay = document.querySelector(".overlay2");
  const redCross = document.querySelector(".red-cross");

  hamburgerMenuButton.addEventListener("click", function () {
    overlay.style.display = "block";
  });

  redCross.addEventListener("click", function () {
    overlay.style.display = "none";
  });
});
