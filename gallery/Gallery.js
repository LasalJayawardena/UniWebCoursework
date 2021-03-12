const changeSong = (song) => {
    curr.pauseSound();
    for (let member in curr) delete curr[member];
    curr = createVisualizer({
      autoplay: true,
      loop: true,
      audio: song,
      canvas: "myCanvas",
      style: "lounge",
      barWidth: 2,
      barHeight: 25,
      barSpacing: 7,
      barColor: "#cafdff",
      shadowBlur: 20,
      shadowColor: "#ffffff",
      font: ["18px", "Helvetica"],
    });
    curr.pausePlay();
};


const HandleDClick = async (e) =>{
    let song = e.target.getAttribute("data-audio");
    if(curr.audio.id != song){
        changeSong(song);
        for (const d of disks) {
            if (d == e.target) {
            d.style.animationPlayState = "running";
            } else {
            d.style.animationPlayState = "paused";
            }
        }
    }else{
        await curr.pausePlay();
        for (const d of disks) {
            if (d == e.target) {
                if(curr.ctx.state== "suspended"){
                    d.style.animationPlayState = "paused";
                }else{
                    d.style.animationPlayState = "running";
                }
            } 
        }
    }

}

const disks = document.querySelectorAll(".img-container img");
for(const d of disks){
    d.addEventListener("click",HandleDClick);
}

const imageLinks = document.querySelectorAll(".imgL");

const mouseOverLink = (e) =>{
    console.log("in");
    for (const img of imageLinks) {
        if(img != e.target){
            img.classList.remove("ungray");
            img.classList.add("gray");
        }
    }
}

const mouseLevaeLink = (e) => {
  for (const img of imageLinks) {
      img.classList.remove("gray");
    img.classList.add("ungray");
  }
};

console.log(imageLinks);

for(const img of imageLinks){
    console.log("ok");
    img.addEventListener("mouseenter", mouseOverLink);
    img.addEventListener("mouseleave", mouseLevaeLink);
}