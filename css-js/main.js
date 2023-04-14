document.onkeydown=function(e){if(!e.target.matches("input")&&!e.target.matches("textarea"))return!1};

document.addEventListener("keydown", function(e) {
    if (e.key === "F12") {
      alert("Bỏ tay ra bạn êy!");
      e.preventDefault();
      return false;
    }
  });

  document.addEventListener("keyup", function(e) {
    if (e.key === "F12") {
      e.preventDefault();
      return false;
    }
  });

document.addEventListener("keydown", function(event) {

    if (event.key === "t" || event.key === "T") {

        var snow = document.getElementById("snow");
        if (snow.style.display === "none") {
            snow.style.display = "block";
        } else {
            snow.style.display = "none";
        }
    }
});

  
  var snow = function() {

    var canvas = document.createElement("canvas");

    canvas.setAttribute("id", "snow");

    document.body.appendChild(canvas);


    var width = window.innerWidth;
    var height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext("2d");

    var flakes = [];

    var numOfFlakes = 200;
    for (var i = 0; i < numOfFlakes; i++) {
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 4 + 1,
            d: Math.random() + 1
        });
    }

    var drawFlakes = function() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for (var i = 0; i < numOfFlakes; i++) {
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
    };

    var moveFlakes = function() {
        for (var i = 0; i < numOfFlakes; i++) {
            var f = flakes[i];
            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(i * 0.5) * 2;
            if (f.y > height) {
                flakes[i] = {
                    x: Math.random() * width,
                    y: 0,
                    r: f.r,
                    d: f.d
                };
            }
        }
    };

    setInterval(drawFlakes, 25);
};

snow();

function showVolumeNotification() {
  var volumeNotification = document.createElement("div");
  volumeNotification.setAttribute("id", "volume-notification");
  volumeNotification.innerHTML = "Âm lượng đã thay đổi!";
  document.body.appendChild(volumeNotification);

  setTimeout(function() {
    document.body.removeChild(volumeNotification);
  }, 2000);
}

var audioElement = document.getElementById('audio');
var playPauseBTN = document.getElementById('playPauseBTN');
var count = 0;

function playPause(){
  if(count == 0){
    count = 1;
    audioElement.play();
    playPauseBTN.innerHTML = "Pause";
  }else{
    count = 0;
    audioElement.pause();
    playPauseBTN.innerHTML = "Play";
  }
}

function formatVolume(volume) {
  return (volume * 100).toFixed(2) + '%';
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'n' || event.key === 'N') {
    playPause();
  } else if (event.key === 'a' || event.key === 'A') {
    audioElement.volume -= 0.1; // giảm âm lượng đi 10%
    var volume = formatVolume(audioElement.volume);
    showVolumeNotification();
  } else if (event.key === 'd' || event.key === 'D') {
    audioElement.volume += 0.1; // tăng âm lượng lên 10%
    var volume = formatVolume(audioElement.volume);
    showVolumeNotification();
  }
});

playPauseBTN.addEventListener('click', function() {
  playPause();
});




