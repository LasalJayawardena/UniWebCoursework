const openEl = document.querySelector(".open-modal");
const closeEl = document.querySelector("[data-close]");
const isVisible = "is-visible";
const modal_win = document.getElementById("modal");

const closeModal = () => {
  modal_win.classList.remove(isVisible);
  modal_content.innerHTML = "";
};

closeEl.addEventListener("click", function () {
  closeModal();
});

document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    closeModal();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    closeModal();
  }
});

const timepan = document.getElementById("reidrectTime");
const redirectMsg = document.getElementById("rMsg");
const redirect = () => {
    redirectMsg.innerHTML = `Dear ${Mname.value}, Thank you for registering with Euphoria, You will be directed to our Gallery page.`;
    let time = 6;
    let t = setInterval(() => {
      time--;  
      timepan.innerHTML = `${time}s`;  
      if (time == 0) {
        window.location.replace("../../main.html");
        clearInterval(t);
      }
    }, 1000);
}

