
window.onscroll = function () {
  scroll();
};

function scroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

// ========================================
let dmonkey =[ 
`
They say oh my god I see the way you shine
Take your hand, my dear, and place them both in mine
You know you stopped me dead while I was passing by
And now I beg to see you dance just one more time
Ooh I see you, see you, see you every time
And oh my I, I, I like your style
You, you make me, make me, make me wanna cry
And now I beg to see you dance just one more time
So they say
Dance for me, dance for me, dance for me, oh, oh, oh
I've never seen anybody do the things you do before
They say move for me, move for me, move for me, ay, ay, ay
And when you're done I'll make you do it all again
I said oh my god I see you walking by
Take my hands, my dear, and look me in my eyes
Just like a monkey I've been dancing my whole life
But you just beg to see me dance just one more time
Ooh I see you, see you, see you every time
And oh my I, I like your style
You, you make me, make me, make me wanna cry
And now I beg to see you dance just one more time
So they say
Dance for me, dance for me, dance for me, oh, oh, oh
I've never seen anybody do the things you do before
They say move for me, move for me, move for me, ay, ay, ay
And when you're done I'll make you do it all again
They say
Dance for me, dance for me, dance for me, oh, oh, oh, oh, oh, oh, oh
I've never seen anybody do the things you do before
They say move for me, move for me, move for me, ay, ay, ay
And when you're done I'll make you do it all again
Ooh
Woah-oh, woah-oh, oh
Ooh
Ah ah, ah
They say
Dance for me, dance for me, dance for me, oh, oh, oh
I've never seen anybody do the things you do before
They say move for me, move for me, move for me, ay, ay, ay
And when you're done I'll make you do it all again
They say
Dance for me, dance for me, dance for me, oh, oh, oh, oh, oh, oh, oh
I've never seen anybody do the things you do before
They say move for me, move for me, move for me, ay, ay, ay
And when you're done I'll make you do it all again
All again
`];

let TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 200;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

let play = true;

// prototype to add tick method
TxtRotate.prototype.tick = function () {

    if(!play){
        setTimeout(() => {
        this.tick();
        }, 1);
        return
    }

    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    let that = this;
    let delta = 200 - Math.random() * 100;


//   if (this.isDeleting) {
//     delta /= 2;
//   }

//   if (!this.isDeleting && this.txt === fullTxt) {
//     delta = this.period;
//     this.isDeleting = true;
//   } else if (this.isDeleting && this.txt === "") {
//     this.isDeleting = false;
//     this.loopNum++;
//     delta = 200;
//   }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  let elements = document.getElementsByClassName("txt-rotate");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = dmonkey;
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      //   JSON.parse to create js object
      new TxtRotate(elements[i], toRotate, period);
    }
  }
};

const test= document.querySelector(".test");

const handleE = (e) =>{
    play = e.detail["play"];
}

window.document.addEventListener("myCustomEvent", handleE, false);