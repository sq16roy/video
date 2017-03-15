
    (function(){
        initialisemyPlayer();
    })();
    // Variables to store handles to various required elements
    var myPlayer;
    var playPauseBtn;
    var muteBtn;
    var progressBar;
    var myPlayer;
    function initialisemyPlayer() {
    myPlayer = document.getElementById('media-video');
    myPlayer.controls = false;
    myPlayer.addEventListener('timeupdate', updateProgressBar, false);
    }
    function togglePlayPause() {
    var btn = document.getElementById('play-pause-button');
    if (myPlayer.paused || myPlayer.ended) {
        btn.className = 'fa fa-pause-circle-o';
        myPlayer.play();
    }
    else {
        btn.className = 'fa fa-play-circle-o';
        myPlayer.pause();
    }
}
function stopPlayer() {
   myPlayer.pause();
   myPlayer.currentTime = 0;
   document.getElementById('play-pause-button').className = 'fa fa-play-circle-o';
}
function changeVolume(direction) {
   if (direction === '+') myPlayer.volume += myPlayer.volume == 1 ? 0 : 0.1;
   else myPlayer.volume -= (myPlayer.volume == 0 ? 0 : 0.1);
   myPlayer.volume = parseFloat(myPlayer.volume).toFixed(1);
}
function toggleMute() {
   var btn = document.getElementById('mute-button');
   if (myPlayer.muted) {
      changeButtonType(btn, 'fa fa-volume-off');
      myPlayer.muted = false;
   }
   else {
      changeButtonType(btn, 'fa fa-volume-up');
      myPlayer.muted = true;
   }
}
function replayMedia() {
   resetPlayer();
   myPlayer.play();
}
function resetPlayer() {
   progressBar.value = 0;
   myPlayer.currentTime = 0;
   changeButtonType(playPauseBtn, 'play');
}
function changeButtonType(btn, value) {
   btn.className = value;
}
var secondTimer =0;
function updateProgressBar() {
   let minutesTimer =0;
   
        if (secondTimer >60) {
            secondTimer =0;
        } else{
             setTimeout(function(){secondTimer++;}, 5000);
        }
       minutesTimer = Math.floor(myPlayer.currentTime) /60;
       console.log(secondTimer);
       document.getElementById('minutes').innerHTML = "time:"+"m:"+Math.floor(minutesTimer)+"s:"+secondTimer;
   var progressBar = document.getElementById('progress-bar');
   var percentage = Math.floor((100 / myPlayer.duration) *
   myPlayer.currentTime);
  // console.log(Math.floor(myPlayer.currentTime));
   progressBar.value = percentage;
   progressBar.innerHTML = percentage + '% played';
   if (percentage === 100) {
       document.getElementById('play-pause-button').className = 'fa fa-repeat';
   }
}