let testmusic = document.getElementById("testmusic");
let playbutton = document.getElementById("playbutton");

playbutton.onclick = function() {
    if (testmusic.paused) {
        testmusic.play();
        playbutton.src = "./mainpage/mainpageresources/images/pause-button.png";
    } else {
        testmusic.pause();
        playbutton.src = "./mainpage/mainpageresources/images/play-button.png";

    }
}