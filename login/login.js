const username = document.querySelector("#user");
const password = document.querySelector("#pass");
const btn = document.querySelectorAll("#btn");


const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


const valid_username = (name) => {
    valid = true;
    if(name.length < 5 || name.length > 70){
        valid = false;
    }
    if(! isEmail(name)){
        valid= false;
    }
    return valid;
}

const valid_password = (pass) => {
    return pass.length > 5 && pass.length < 20;
}

const checkSubmit = function(){
    let uname = username.value;
    let pass = password.value;
    let v_uname = valid_username(uname);
    let v_pass = valid_password(pass);
    console.log(v_uname, v_pass);
} 

username.addEventListener("keyup", checkSubmit);
password.addEventListener("keyup", checkSubmit);

