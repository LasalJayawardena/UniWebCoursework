class AudioVisualizer {
  INTERVAL = null;
  FFT_SIZE = 512;
  TYPE = { lounge: "renderLounge" };

  constructor(cfg) {
    this.isPlaying = false;
    this.autoplay = cfg.autoplay || false;
    this.loop = cfg.loop || false;
    this.audio = document.getElementById(cfg.audio) || {};
    this.canvas = document.getElementById(cfg.canvas) || {};
    this.canvasCtx = this.canvas.getContext("2d") || null;
    this.author = this.audio.getAttribute("data-author") || "";
    this.title = this.audio.getAttribute("data-title") || "";
    this.ctx = null;
    this.analyser = null;
    this.sourceNode = null;
    this.frequencyData = [];
    this.audioSrc = null;
    this.duration = 0;
    this.minutes = "00";
    this.seconds = "00";
    this.style = cfg.style || "lounge";
    this.barWidth = cfg.barWidth || 2;
    this.barHeight = cfg.barHeight || 2;
    this.barSpacing = cfg.barSpacing || 5;
    this.barColor = cfg.barColor || "#ffffff";
    this.shadowBlur = cfg.shadowBlur || 10;
    this.shadowColor = cfg.shadowColor || "#ffffff";
    this.font = cfg.font || ["12px", "Helvetica"];
    this.gradient = null;
  }

  setContext = function () {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new window.AudioContext();
      // console.log(this.ctx);
      return this;
    } catch (e) {
      console.info("Web Audio API is not supported.", e);
    }
  };

  setAnalyser = function () {
    this.analyser = this.ctx.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.6;
    this.analyser.fftSize = this.FFT_SIZE;
    return this;
  };

  setFrequencyData = function () {
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    return this;
  };

  setBufferSourceNode = function () {
    this.sourceNode = this.ctx.createBufferSource();
    this.sourceNode.loop = this.loop;
    this.sourceNode.connect(this.analyser);
    this.sourceNode.connect(this.ctx.destination);

    this.sourceNode.onended = function () {
      clearInterval(INTERVAL);
      this.sourceNode.disconnect();
      this.resetTimer();
      this.isPlaying = false;
      this.sourceNode = this.ctx.createBufferSource();
    }.bind(this);

    return this;
  };

  setMediaSource = function () {
    this.audioSrc = this.audio.getAttribute("src");
    return this;
  };

  setCanvasStyles = function () {
    this.gradient = this.canvasCtx.createLinearGradient(0, 0, 0, 300);
    this.gradient.addColorStop(1, this.barColor);
    this.canvasCtx.fillStyle = this.gradient;
    this.canvasCtx.shadowBlur = this.shadowBlur;
    this.canvasCtx.shadowColor = this.shadowColor;
    this.canvasCtx.font = this.font.join(" ");
    this.canvasCtx.textAlign = "center";
    return this;
  };

  pausePlay = function () {
    if (!this.isPlaying) {
      return this.ctx.state === "suspended"
        ? this.playSound()
        : this.loadSound();
    } else {
      return this.pauseSound();
    }
  };

  bindEvents = function () {
    let _this = this;

    document.addEventListener("click", async (e) => {
      if (e.target === _this.canvas) {
        e.stopPropagation();
        await _this.pausePlay();
        for (const d of disks) {
            if (d.getAttribute("data-audio") == _this.audio.id) {
                if (_this.ctx.state == "suspended") {
                    d.style.animationPlayState = "paused";
                } else {
                    d.style.animationPlayState = "running";
                }
            }
        }
      }
    });

    if (_this.autoplay) {
      _this.loadSound();
    }

    return this;
  };

  loadSound = function () {
    let req = new XMLHttpRequest();
    req.open("GET", this.audioSrc, true);
    req.responseType = "arraybuffer";
    this.canvasCtx.fillText(
      "Loading...",
      this.canvas.width / 2 + 10,
      this.canvas.height / 2
    );

    req.onload = function () {
      this.ctx.decodeAudioData(
        req.response,
        this.playSound.bind(this),
        this.onError.bind(this)
      );
    }.bind(this);

    req.send();
  };

  playSound = function (buffer) {
    this.isPlaying = true;

    if (this.ctx.state === "suspended") {
      return this.ctx.resume();
    }

    this.sourceNode.buffer = buffer;
    this.sourceNode.start(0);
    this.resetTimer();
    this.startTimer();
    this.renderFrame();
    this.ctx.suspend();
    this.isPlaying = false;
  };

  pauseSound = function () {
    this.ctx.suspend();
    this.isPlaying = false;
  };

  startTimer = function () {
    let _this = this;
    this.INTERVAL = setInterval(function () {
      if (_this.isPlaying) {
        let now = new Date(_this.duration);
        let min = now.getHours();
        let sec = now.getMinutes();
        _this.minutes = min < 10 ? "0" + min : min;
        _this.seconds = sec < 10 ? "0" + sec : sec;
        _this.duration = now.setMinutes(sec + 1);
      }
    }, 1000);
  };

  resetTimer = function () {
    let time = new Date(0, 0);
    this.duration = time.getTime();
  };

  onError = function (e) {
    console.info("Error decoding audio file. -- ", e);
  };

  renderFrame = function () {
    requestAnimationFrame(this.renderFrame.bind(this));
    this.analyser.getByteFrequencyData(this.frequencyData);

    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderTime();
    this.renderText();
    this.renderByStyleType();
  };

  renderText = function () {
    let cx = this.canvas.width / 2;
    let cy = this.canvas.height / 2;
    let correction = 10;

    this.canvasCtx.textBaseline = "top";
    this.canvasCtx.fillText("by " + this.author, cx + correction, cy);
    this.canvasCtx.font = parseInt(this.font[0], 10) + 8 + "px " + this.font[1];
    this.canvasCtx.textBaseline = "bottom";
    this.canvasCtx.fillText(this.title, cx + correction, cy);
    this.canvasCtx.font = this.font.join(" ");
  };

  renderTime = function () {
    let time = this.minutes + ":" + this.seconds;
    this.canvasCtx.fillText(
      time,
      this.canvas.width / 2 + 10,
      this.canvas.height / 2 + 40
    );
  };

  renderByStyleType = function () {
    return this[this.TYPE[this.style]]();
  };

  renderLounge = function () {
    let cx = this.canvas.width / 2;
    let cy = this.canvas.height / 2;
    let radius = 140;
    let maxBarNum = Math.floor(
      (radius * 2 * Math.PI) / (this.barWidth + this.barSpacing)
    );
    let slicedPercent = Math.floor((maxBarNum * 25) / 100);
    let barNum = maxBarNum - slicedPercent;
    let freqJump = Math.floor(this.frequencyData.length / maxBarNum);

    for (let i = 0; i < barNum; i++) {
      let amplitude = this.frequencyData[i * freqJump];
      let alfa = (i * 2 * Math.PI) / maxBarNum;
      let beta = ((3 * 45 - this.barWidth) * Math.PI) / 180;
      let x = 0;
      let y = radius - (amplitude / 12 - this.barHeight);
      let w = this.barWidth;
      let h = amplitude / 6 + this.barHeight;

      this.canvasCtx.save();
      this.canvasCtx.translate(cx + this.barSpacing, cy + this.barSpacing);
      this.canvasCtx.rotate(alfa - beta);
      this.canvasCtx.fillRect(x, y, w, h);
      this.canvasCtx.restore();
    }
  };
}

function createVisualizer(cfg) {
    let visualizer = new AudioVisualizer(cfg);

    visualizer
        .setContext()
        .setAnalyser()
        .setFrequencyData()
        .setBufferSourceNode()
        .setMediaSource()
        .setCanvasStyles()
        .bindEvents();


    return visualizer;
}
var curr;
document.addEventListener(
  "DOMContentLoaded",
  () => {
    curr = createVisualizer({
      autoplay: true,
      loop: true,
      audio: "myAudio3",
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
  }
);