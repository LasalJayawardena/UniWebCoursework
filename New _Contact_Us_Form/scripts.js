function validation() {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let error_message = document.getElementById("error_message");
    let success_message = document.getElementById("success_message");
    let text;
    error_message.style.padding = "10px";

    if (fname.length < 1) {
        text = "Please Enter First Name"
        error_message.innerHTML = text;
        return false;
    } else if (lname.length < 1) {
        text = "Please Enter Last Name"
        error_message.innerHTML = text;
        return false;
    } else if (isNaN(phone) || phone.length != 10) {
        text = "Please Enter Phone Number"
        error_message.innerHTML = text;
        return false;

    } else if (email.indexOf("@") == -1 || email.length < 6) {
        text = "Please Enter E-Mail"
        error_message.innerHTML = text;
        return false;
    } else if (message.length < 15) {
        text = "Please Enter A Message of 15 characters or more"
        error_message.innerHTML = text;
        return false;
    }

    let e = document.getElementById("country");
    let result = e.options[e.selectedIndex].text;
    if (result == "-- Select --") {
        text = "Please Select A Value For The Drop-Down"
        error_message.innerHTML = text;
        return false;
    }



    function resetForm() {
        document.getElementById("contactForm").reset();
    }

    alert("Name: " + fname +
        " | Email: " + email +
        " | Subject: " + result +
        " | Details: " + message
    );


}