document.addEventListener("DOMContentLoaded", function () {
  const rateButtons = document.querySelectorAll(".rate-button");
  const overlay = document.getElementById("overlay1");
  const stars = document.querySelectorAll(".star");
  const confirmButton = document.querySelector(".confirm-button");
  const cancelButton = document.querySelector(".cancel-button");

  rateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      overlay.style.display = "flex";
    });
  });

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = star.getAttribute("data-value");
      stars.forEach((s) => {
        if (s.getAttribute("data-value") <= value) {
          s.textContent = "★";
        } else {
          s.textContent = "☆";
        }
      });
    });
  });

  confirmButton.addEventListener("click", () => {
    overlay.style.display = "none";
    resetStars();
  });

  cancelButton.addEventListener("click", () => {
    overlay.style.display = "none";
    resetStars();
  });

  function resetStars() {
    stars.forEach((s) => {
      s.textContent = "☆";
    });
  }
});
