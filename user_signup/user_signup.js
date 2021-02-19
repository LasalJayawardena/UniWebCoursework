const openEl = document.querySelector(".open-modal" );
const closeEl = document.querySelector("[data-close]");
const isVisible = "is-visible";
const modal_win = document.getElementById("modal");

openEl.addEventListener("click", function () {
    modal_win.classList.add(isVisible);
});


closeEl.addEventListener("click", function () {
  modal_win.classList.remove(isVisible);
});


document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    modal_win.classList.remove(isVisible);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    modal_win.classList.remove(isVisible);
  }
});
