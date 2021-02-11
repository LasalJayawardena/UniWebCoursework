fetch("./navbar/navbar.html")
    .then((response) => {
    if(response.status != 200){
        throw "Navbar - File path not correct or JS malfuction.";
    }
    return response.text();
    })
    .then((data) => {
    document.querySelector("Navbar").innerHTML = data;
    })
    .catch((err) =>{
        console.log(err)
    })
        

