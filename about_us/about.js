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
    if (this != img_d[i]) {
      img_d[i].classList.add("grey");
    }
  }
  var name = this.getAttribute("data-info");
  d_name = infodict[name][0];
  d_desc = infodict[name][1];

  Description_h1.innerHTML = d_name;
  Description_p.innerHTML = d_desc;
  Description_h1.classList.add("fadeH");
  Description_p.classList.add("fadeP");
  main.innerHTML = "Get to know us :)";
};

const removeContent = function () {
  Description_h1.innerHTML = "Welcome !";
  Description_p.innerHTML = "Hover over our images to get to know us!";
  Description_h1.classList.remove("fadeH");
  Description_p.classList.remove("fadeP");
  for (let i = 0; i < img_d.length; i++) {
    if (this != img_d[i]) {
      img_d[i].classList.remove("grey");
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

const img_d = document.getElementsByClassName("author");
const Description_h1 = document.querySelector(".authorcontent h1");
const Description_p = document.querySelector(".authorcontent p");
const main = document.querySelector("h1");

for (let i = 0; i < img_d.length; i++) {
  img_d[i].addEventListener("mouseover", addContent);
  img_d[i].addEventListener("mouseleave", removeContent);
  img_d[i].addEventListener("touchstart", addContent);
  img_d[i].addEventListener("touchend", removeMob);
}

