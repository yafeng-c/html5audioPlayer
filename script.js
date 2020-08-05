var video = document.querySelector('.video');
var progressbar = document.getElementById('progress-bar');
var progress = document.getElementById('progress');
var playpause = document.getElementById('play-pause');
var muteunmute = document.getElementById('mute-unmute');
var volinc = document.getElementById('volinc');
var voldec = document.getElementById('voldec');
var fullscreen = document.getElementById('fullscreen');
var container = document.getElementById('container');

function togglePlayPause(){
    if(video.paused){
        playpause.className='pause';
        video.play();       
    }else{
        playpause.className='play';
        video.pause();
    }
}
playpause.onclick = function (){
    togglePlayPause();
}

video.addEventListener('loadedmetadata', function() {
    progress.setAttribute('max', video.duration);
 });

 video.addEventListener('timeupdate', function() {
    progress.value = video.currentTime;
    progressbar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
 });

video.addEventListener('timeupdate', function() {
    if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
    progress.value = video.currentTime;
    progressbar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
 });

 progress.addEventListener('click', function(e) {
    var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
    video.currentTime = pos * video.duration;
 });

muteunmute.addEventListener('click', function(e) {
    if(video.muted){
        muteunmute.className = 'unmute';
        video.muted = false;
    }else{
        muteunmute.className = 'mute';
        video.muted = true;
    }
 });

 volinc.addEventListener('click', function(e) {
    alterVolume('+');
 });
 voldec.addEventListener('click', function(e) {
    alterVolume('-');
 });

 var alterVolume = function(dir) {
    var currentVolume = Math.floor(video.volume * 10) / 10;
    if (dir === '+') {
       if (currentVolume < 1) video.volume += 0.1;
    }
    else if (dir === '-') {
       if (currentVolume > 0) video.volume -= 0.1;
    }
 }

 fullscreen.addEventListener('click', function(e) {
    handleFullscreen();
 });
 var handleFullscreen = function() {
    if (isFullScreen()) {
       if (document.exitFullscreen) document.exitFullscreen();
       else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
       else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
       else if (document.msExitFullscreen) document.msExitFullscreen();
       setFullscreenData(false);
    }
    else {
       if (container.requestFullscreen) container.requestFullscreen();
       else if (container.mozRequestFullScreen) container.mozRequestFullScreen();
       else if (container.webkitRequestFullScreen) container.webkitRequestFullScreen();
       else if (container.msRequestFullscreen) container.msRequestFullscreen();
       setFullscreenData(true);
    }
 }

 var isFullScreen = function() {
    return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
 }

 var setFullscreenData = function(state) {
    container.setAttribute('data-fullscreen', !!state);
 }

 document.addEventListener('fullscreenchange', function(e) {
    setFullscreenData(!!(document.fullscreen || document.fullscreenElement));
 });
 document.addEventListener('webkitfullscreenchange', function() {
    setFullscreenData(!!document.webkitIsFullScreen);
 });
 document.addEventListener('mozfullscreenchange', function() {
    setFullscreenData(!!document.mozFullScreen);
 });
 document.addEventListener('msfullscreenchange', function() {
    setFullscreenData(!!document.msFullscreenElement);
 });