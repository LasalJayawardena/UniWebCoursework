const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const form = document.getElementById("form1");
const container1 = document.getElementById("container1");
// Form1

const Mname = document.getElementById("Maidenname");
const surname = document.getElementById("surname");
const gender = document.getElementById("gender");
const occupation = document.getElementById("occupation");
const form2 = document.getElementById("form2");
const container2 = document.getElementById("container2");
// Form2

const FavouriteArtist = document.getElementById("FavouriteArtist");
const price = document.getElementById("price");
const MusicMode = document.getElementById("MusicMode");
const Mail = document.getElementById("Mail");
const container3 = document.getElementById("container3");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, 'Email is not valid');
    return false;
  }
}

// Check required fields
function checkRequired(inputArr) {
  allOk = true
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      allOk = false
    } else {
      showSuccess(input);
    }
  });
  return allOk;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
    return false;
  }
  return true;
}

// Get fieldname
function getFieldName(input) {
    const name = input.getAttribute("data-desc");
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Event listeners
form.addEventListener('submit', (e)  =>{
    e.preventDefault();

    let Rcheck= checkRequired([username, email, password, password2]);
    let Lcheck = checkLength(username, 3, 15);
    let Lcheck2 =checkLength(password, 6, 25);
    let mailC = checkEmail(email);
    let pass = checkPasswordsMatch(password, password2);

    if(!(Rcheck && Lcheck && Lcheck2 && mailC && pass)){
        return;
    }
    container1.style.display = "none";
    container2.style.display = "block";
});

form2.addEventListener("submit", (e) => {
  e.preventDefault();

  let Rcheck = checkRequired([Mname, surname, gender, occupation]);
  let Lcheck = checkLength(Mname, 3, 20);
  let Lcheck2 = checkLength(surname, 3, 20);
  let Lcheck3 = checkLength(occupation, 4, 30);

  if (!(Rcheck && Lcheck && Lcheck2 && Lcheck3)) {
    return;
  }
  container2.style.display = "none";
  container3.style.display = "block";
});

form3.addEventListener("submit", (e) => {
    e.preventDefault();

    let Rcheck = checkRequired([FavouriteArtist, MusicMode, Mail]);
    let Lcheck = checkLength(FavouriteArtist, 3, 20);
    let Lcheck2 = checkLength(MusicMode, 3, 20);

    if (!(Rcheck && Lcheck && Lcheck2)) {
    return;
    }

    redirect();
    modal_win.classList.add(isVisible);
});


// ========= Prcerange =================
const pRange = document.getElementById("price");
const pH4 = document.querySelector("h4");
const pSpan = document.querySelector("h4 span");
const prefPrice = document.getElementById("prefPrice"); 
let rangePercent = pRange.value;

const displayPrice = () => {
  rangePercent = pRange.value;
  prefPrice.innerHTML = `$ ${rangePercent}`;
  pH4.innerHTML = "<span></span>"+rangePercent;
  pRange.style.filter = "hue-rotate(" + (rangePercent / 1000) * 200 + "deg)";
  pH4.style.filter = "hue-rotate(" + ( (rangePercent / 1000)*200) + "deg)";
  pH4.style.transform = `translateX(-1px) scale(${1 + rangePercent / 1000})`;
  pH4.style.left = `${rangePercent/10}%`;
};

pRange.addEventListener("input", displayPrice)


const cancelbtn = document.getElementById("cancelbtn");
const back1 = document.getElementById("back1");
const back2 = document.getElementById("back2");

cancelbtn.addEventListener("click", () =>{
  history.back()
})

back1.addEventListener("click", () => {
    container2.style.display = "none";
    container1.style.display = "block";
});

back2.addEventListener("click", () => {
    container3.style.display = "none";
    container2.style.display = "block";
});
