fetch("../navbar/navbar.html")
  .then((response) => {
    if (response.status != 200) {
      throw "Navbar - File path not correct or JS malfuction. in about us";
    }
    return response.text();
  })
  .then((data) => {
    document.querySelector("nav").innerHTML = data;
  })
  .catch((err) => {
    console.log(err);
  });

const infodict = {
  chamika: ["Chamika", "I am a UI designer"],
  nithila: ["Nithila", "I am tech savvy"],
  lasal: ["Lasal", "I am a code cruncher"],
};

const addContent = function () {
    for (let i = 0; i < img_d.length; i++) {
        prof_images[i].classList.remove("ungray");
        if (this == img_d[i]) {
            social_btn[i].classList.remove("unipopup");
            social_btn[i].classList.add("ipopup");
            prof_images[i].classList.add("brighter");
        } else{
            prof_images[i].classList.add("gray");
        }
    }


};

const removeContent = function () {

  for (let i = 0; i < img_d.length; i++) {
    if (this == img_d[i]) {
        social_btn[i].classList.add("unipopup");
        social_btn[i].classList.remove("ipopup");
        prof_images[i].classList.remove("brighter");
    } else {
        prof_images[i].classList.remove("gray");
        prof_images[i].classList.add("ungray");
    }
  }
};

const removeMob = function () {
  // Description_h1.innerHTML = "Welcome !";
  // Description_p.innerHTML = "Hover over our images to get to know us!";
  Description_h1.classList.remove("fadeH");
  Description_p.classList.remove("fadeP");
  for (let i = 0; i < img_d.length; i++) {
    if (this != img_d[i]) {
      img_d[i].classList.remove("grey");
    }
  }
};

const img_d = document.querySelectorAll(".dev");
const social_btn = document.querySelectorAll(".dev .social");
const prof_images = document.querySelectorAll(".author");

for (let i = 0; i < img_d.length; i++) {
  img_d[i].addEventListener("mouseenter", addContent);
  img_d[i].addEventListener("mouseleave", removeContent);
//   img_d[i].addEventListener("touchstart", addContent);
//   img_d[i].addEventListener("touchend", removeMob);
}
