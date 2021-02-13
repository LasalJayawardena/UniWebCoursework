fetch("../navbar/navbar.html")
  .then((response) => {
    if (response.status != 200) {
      throw "Navbar - File path not correct or JS malfuction.";
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
    "chamika":["Chamika", "I am a UI designer"],
    "nithila":["Nithila", "I am tech savvy"],
    "lasal":["Lasal", "I am a code cruncher"]
}

const addContent = function () {
    var name = this.getAttribute("data-info");
    d_name = infodict[name][0];
    d_desc = infodict[name][1];

    Description_h1.innerHTML = d_name;
    Description_p.innerHTML = d_desc;
}; 

const img_d= document.getElementsByClassName("author");
const Description_h1 = document.querySelector(".authorcontent h1");
const Description_p = document.querySelector(".authorcontent p");

for (let i = 0; i < img_d.length; i++) {
    img_d[i].addEventListener("mouseover", addContent)
}


