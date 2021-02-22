const openEl = document.querySelector(".open-modal" );
const closeEl = document.querySelector("[data-close]");
const isVisible = "is-visible";
const modal_win = document.getElementById("modal");
const part1 = document.querySelector("#part1");
const part2 = document.querySelector("#part2");
const c_btn = document.querySelector(".continue");
const back_btn = document.querySelector(".back");
const main_back_btn = document.querySelector("#goBack");

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

c_btn.addEventListener("click", (e) =>{
  part1.setAttribute("style", "z-index: 1; opacity:0;");
  part2.setAttribute("style", "z-index: 2; opacity:1;");
})

back_btn.addEventListener("click", (e) => {
  part1.setAttribute("style", "z-index: 2; opacity:1;");
  part2.setAttribute("style", "z-index: 1; opacity:0;");
});

main_back_btn.addEventListener("click", (e) =>{
  window.history.back();
})

const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const checkWeakPass = (password) => {
    let strength = false;
    let pass = password.trim();
    let pass_l = pass.length;
    let cap_l = 0;
    let num_d = 0; 
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
     
    for(i=0;i<pass.length;i++)
    {
        if(pass[i] == pass[i].toUpperCase()){
            cap_l++;
        }
        if (!isNaN(pass[i])) {
          num_d++;
        }    
    }
    if (pass_l < 6 || cap_l < 1 || num_d < 1 || !format.test(pass) ) {
      strength = true;
    }
    return strength;
}

// ===================== Functionalities of the form ============================
const Form_Name_el = document.getElementById("Name");
const Form_Email_el = document.getElementById("Email");
const Form_Password_el = document.getElementById("Password");
const Form_Gender_el = document.getElementById("Gender");
const Form_Occupation_el = document.getElementById("Occupation");
const Form_Price_el = document.getElementById("Price");
const Form_Brands_el = document.getElementById("Brands");
const Form_Features_el = document.getElementById("Features");
const Form_Genres_el = document.getElementById("Genres");

let F_name;
let F_Email;
let F_Password;
let F_Gender;
let F_Occupation;
let F_Price;
let F_Brands;
let F_Features;
let F_Genres;

Form_Name_el.addEventListener("input", e => {
  F_name = e.target.value;
});

Form_Email_el.addEventListener("input", e =>{
  F_Email = e.target.value;
});

Form_Password_el.addEventListener("input", e =>{
  F_Password = e.target.value;
});

Form_Gender_el.addEventListener("input", e =>{
  F_Gender = e.target.value;
});

Form_Occupation_el.addEventListener("input", e =>{
  F_Occupation = e.target.value;
});

Form_Price_el.addEventListener("input", e =>{
  F_Price = e.target.value;
});

Form_Brands_el.addEventListener("input", e =>{
  F_Brands = e.target.value;
});

Form_Features_el.addEventListener("input", e =>{
  F_Features = e.target.value;
});

Form_Genres_el.addEventListener("input", e =>{
  F_Genres = e.target.value;
});


let check_F_name;
let check_F_Email;
let check_F_Password;
let check_F_Gender;
let check_F_Occupation;
let check_F_Price;
let check_F_Brands;
let check_F_Features;
let check_F_Genres;

const checkAll = () =>{
    check_F_name = (F_name != "")
    check_F_Email = isEmail(F_Email);
    check_F_Password = iswe
}


openEl.addEventListener("click", function () {
  checkAll();
  modal_win.classList.add(isVisible);
});
