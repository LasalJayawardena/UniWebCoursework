let testmusic = document.getElementById("testmusic");
let playbutton = document.getElementById("playbutton");

playbutton.onclick = function() {
    if (testmusic.paused) {
        testmusic.play();
        playbutton.src = "mainpageresources/images/pause-button.png"
    } else {
        testmusic.pause();
        playbutton.src = "mainpageresources/images/play-button.png"

    }
}