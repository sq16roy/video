(function() {
    launcher();
})();
// Variables to store handles to various required elements
var myPlayer,
    playPauseBtn,
    muteBtn,
    progressBar,
    myPlayer,
    seekBar,
    seekVolume,
    tempVol = seekVolume.value;
//main function
function launcher() {
    myPlayer = document.getElementById('media-video');
    seekBar = document.getElementById('progress-bar');
    seekVolume = document.getElementById('volume-bar');
    myPlayer.controls = false;
    myPlayer.addEventListener('timeupdate', updateProgressBar, false);
    seekBar.addEventListener('change', lookBar, false);
    seekVolume.addEventListener('change', changeVolume, false);
}

//function to look for changes in the progress bar
function lookBar(){
    let getBar = myPlayer.duration*(seekBar.value/100);
    myPlayer.currentTime = getBar;
};
//play pause function
function togglePlayPause() {
    var btn = document.getElementById('play-pause-button');
    if (myPlayer.paused || myPlayer.ended) {
        btn.className = 'fa fa-pause-circle-o';
        document.getElementById('click_on_button').className = 'fa fa-play-circle-o hide-me';
        myPlayer.play();
    } else {
        btn.className = 'fa fa-play-circle-o';
        document.getElementById('click_on_button').className = 'fa fa-pause-circle-o show-me';
        myPlayer.pause();
    }
}
//stop function 
function stopPlayer() {
    myPlayer.pause();
    myPlayer.currentTime = 0;
    document.getElementById('play-pause-button').className = 'fa fa-play-circle-o';
    document.getElementById('click_on_button').className = 'fa fa-play-circle-o show-me';
}
//function change volume
function changeVolume() {
    var btn = document.getElementById('mute-button');
    myPlayer.volume = seekVolume.value;
    if (seekVolume.value > 0) {
        tempVol = seekVolume.value;
    }
    if (seekVolume.value == 0) {
        changeButtonType(btn, myIcon());
        myPlayer.muted = true;
    } else {
        changeButtonType(btn, myIcon());
        myPlayer.muted = false;
    }
};

//function to return the icon
function myIcon(){
    if (seekVolume.value == 0.5) {
        return 'fa fa-volume-down';
    } else if(seekVolume.value >0.5){
        return 'fa fa-volume-up';
    } else if(seekVolume.value < 0.1){
        return 'fa fa-volume-off';
    } else if(seekVolume.value >0 && seekVolume.value < 0.5){
        return 'fa fa-volume-down';
    }
};
//function mute
function toggleMute() {
    var btn = document.getElementById('mute-button');
    if (myPlayer.muted) {
        changeButtonType(btn, myIcon());    
        myPlayer.muted = false;
        if (seekVolume.value == 0) {
            myPlayer.volume = tempVol;
            seekVolume.value = tempVol;
            changeButtonType(btn, myIcon());
        } else {
            changeButtonType(btn, myIcon());
            myPlayer.volume = tempVol;
            seekVolume.value = tempVol; 
        }
    } else {
        changeButtonType(btn, 'fa fa-volume-off');
        myPlayer.muted = true;
        seekVolume.value = 0;
    }
    console.log(myPlayer.muted+" "+seekVolume.value+" "+tempVol);
}

function resetPlayer() {
    progressBar.value = 0;
    myPlayer.currentTime = 0;
}
//function to change icon values
function changeButtonType(btn, value) {
    btn.className = value;
}

//function to update the progress
function updateProgressBar() {
    let minutesTimer = Math.floor(myPlayer.currentTime / 60);
    let secondTimer = Math.floor(myPlayer.currentTime - minutesTimer * 60);
    let durationTimer = Math.floor(myPlayer.duration / 60);
    let secDurrationTimer = Math.floor(myPlayer.duration - durationTimer * 60);
    let hourTimer = 0;
    if (secondTimer < 10) {
        secondTimer = "0"+secondTimer;
    }
    if (minutesTimer < 10) {
        minutesTimer = "0"+minutesTimer;
    }
    document.getElementById('minutes').innerHTML = minutesTimer + ":" + secondTimer+"/"+durationTimer + ":" + secDurrationTimer;
    var progressBar = document.getElementById('progress-bar');
    var percentage = Math.floor((100 / myPlayer.duration) *myPlayer.currentTime);
    progressBar.value = percentage;
    if (percentage === 100) {
        document.getElementById('play-pause-button').className = 'fa fa-repeat';
    }
}