
window.onscroll = function () {
  scroll();
};

function scroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

let TxtRotate = function (el, toRotate, period, song) {
  this.toRotate = toRotate;
  this.el = el;
  this.period = parseInt(period, 10) || 200;
  this.txt = "";
  this.song = song;
  this.tick();
};

let play = false;

// prototype to add tick method
TxtRotate.prototype.tick = function () {

    if(currSong != "" && this.song != currSong){
      return
    }
    if(!play){
        setTimeout(() => {
        this.tick();
        }, 10);
        return
    }

    let fullTxt = this.toRotate;

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    let that = this;
    let delta = 200 - Math.random() * 100;



  setTimeout(function () {
    that.tick();
  }, delta);
};

let currText; 
let currSong="";


const lyrics_generator = (s) => {
  let elements = document.getElementsByClassName("txt-rotate")[0];
    let toRotate = lyrics[s];
    if (toRotate) {
      currText = new TxtRotate(elements, toRotate, "400", s);
    }
};
 

const handleE = (e) =>{
    play = e.detail["play"];
    let s = e.detail["song"];
    let default_song = e.detail["default_song"];
    if(!s){
      if(currSong == ""){
        s = default_song;
      }else{
        s=currSong;
      }
    }
    if(s && (s != currSong)){
      currSong = s;
      lyrics_generator(s);
    }
}

window.document.addEventListener("myCustomEvent", handleE, false);