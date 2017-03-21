(function() { launcher(); })();
//get element simplification
function $(item){
    var itemback = document.getElementById(item);
    return itemback;
}
// Variables to store handles to various required elements
var tempVol = $('volume-bar').value;
//main function
function launcher() {
    $('media-video').addEventListener('timeupdate', updateProgressBar, false);
    $('progress-bar').addEventListener('change', lookBar, false);
    $('volume-bar').addEventListener('change', changeVolume, false);
    $('media-video').addEventListener('error', showErrorOnVideo, true);
}
//function to show error
function showErrorOnVideo() { $('videoError').className = 'showError'; };
//function to look for changes in the progress bar
function lookBar(){ $('media-video').currentTime = $('media-video').duration*($('progress-bar').value/100); };
//play pause function
function togglePlayPause() {
    if ($('media-video').paused || $('media-video').ended) {
        $('play-pause-button').className = 'fa fa-pause-circle-o fa-2x';
        $('click_on_button').className = 'fa fa-play-circle-o hide-me';
        $('media-video').play();
    } else {
        $('play-pause-button').className = 'fa fa-play-circle-o fa-2x';
        $('click_on_button').className = 'fa fa-pause-circle-o show-me';
        $('media-video').pause();
    }
}
//stop function 
function stopPlayer() {
    $('media-video').pause();
    $('media-video').currentTime = 0;
    $('play-pause-button').className = 'fa fa-play-circle-o fa-2x';
    $('click_on_button').className = 'fa fa-play-circle-o show-me';
}
//function change volume
function changeVolume() {
    $('media-video').volume = $('volume-bar').value;
    if ($('volume-bar').value > 0) {
        tempVol = $('volume-bar').value;
    }
    if ($('volume-bar').value == 0) {
        changeButtonType($('mute-button'), myIcon());
        $('media-video').muted = true;
    } else {
        changeButtonType($('mute-button'), myIcon());
        $('media-video').muted = false;
    }
};
//function to return the icon
function myIcon(){
    if ($('volume-bar').value == 0.5) {
        return 'fa fa-volume-down fa-2x';
    } else if($('volume-bar').value >0.5){
        return 'fa fa-volume-up fa-2x';
    } else if($('volume-bar').value < 0.1){
        return 'fa fa-volume-off fa-2x';
    } else if($('volume-bar').value >0 && $('volume-bar').value < 0.5){
        return 'fa fa-volume-down fa-2x';
    }
};
//function mute
function toggleMute() {
    if ($('media-video').muted) {
        changeButtonType($('mute-button'), myIcon());    
        $('media-video').muted = false;
        if ($('volume-bar').value == 0) {
            $('media-video').volume = tempVol;
            $('volume-bar').value = tempVol;
            changeButtonType($('mute-button'), myIcon());
        } else {
            changeButtonType($('mute-button'), myIcon());
            $('media-video').volume = tempVol;
            $('volume-bar').value = tempVol; 
        }
    } else {
        changeButtonType(btn, 'fa fa-volume-off fa-2x');
        $('media-video').muted = true;
        $('volume-bar').value = 0;
    }
    console.log($('media-video').muted+" "+$('volume-bar').value+" "+tempVol);
}
//function to reset
function resetPlayer() {
    $('progress-bar').value = 0;
    $('media-video').currentTime = 0;
}
//function to change icon values
function changeButtonType(btn, value) { btn.className = value; }

//function to update the progress
function updateProgressBar() {
    let minutesTimer = Math.floor($('media-video').currentTime / 60);
    let secondTimer = Math.floor($('media-video').currentTime - minutesTimer * 60);
    let durationTimer = Math.floor($('media-video').duration / 60);
    let secDurrationTimer = Math.floor($('media-video').duration - durationTimer * 60);
    let hourTimer = 0;
    $('minutes').innerHTML = ("0" + minutesTimer).slice(-2)+":"+("0" + secondTimer).slice(-2)+":"+("0" + durationTimer).slice(-2)+":"+("0" + secDurrationTimer).slice(-2);
    $('progress-bar').value = Math.floor((100 / $('media-video').duration) *$('media-video').currentTime);;
    if (percentage === 100) {
        $('play-pause-button').className = 'fa fa-repeat fa-2x';
    }
}