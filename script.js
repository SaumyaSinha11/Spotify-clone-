// ____________________________code for carousel_________________________________

const right = document.getElementById("right");
const left = document.getElementById("left");
const posters = document.getElementsByClassName("posters");
let clickArrow = 0;
// console.log(posters)
right.addEventListener("click", function () {
    if(clickArrow<= posters.length/8-1){
    clickArrow++;
    for (let i = clickArrow*4; i>=clickArrow*4-5; i--) {
        posters[i].style.display = "none";
        
    }
}
})
left.addEventListener("click", function () {
    if(clickArrow>0){
    clickArrow--;
    for (let i = clickArrow*4; i>=clickArrow*4; i++) {
    if (posters[i].style.display === "none"){
        posters[i].style.display = "block";
    }        
    }
}
})

// ____________________________________code to play song_____________________________________
let audio; let musicSource; let musicPicture; let musicName;
let currentIndex, playlist;

const menu = document.getElementById("song-container");
const carousel = document.getElementById("carousel");

// menu.addEventListener("click", function(){
//     playlist = 1;
//     console.log(playlist);
// })
// carousel.addEventListener("click", function(){
//     playlist = 0;
//     console.log(playlist);
// })

  audio = document.getElementsByClassName("liked-audio");
  musicPicture = document.getElementsByClassName("liked-song");
  musicName = document.getElementsByTagName("h5");
  musicSource = document.getElementsByClassName("liked-audio")

function music(img, name, source, time){
    this.img = img;
    this.name = name;
    this.source = source;
    this.time = time;
}

const musicList = []
for (let i = 0; i < 17; i++) {
    musicList[i] = new music(musicPicture[i].getAttribute("src"), musicName[i].innerText, musicSource[i].getAttribute("src"));
}

const arr = [].slice.call(posters);

arr.forEach((element, index)=> {
    element.addEventListener("click", function(){
        if (currentIndex !== undefined && !audio[currentIndex].paused) {
            audio[currentIndex].pause();
        }
        currentIndex = index;
        document.getElementById("song-img").src = musicList[currentIndex].img;
        document.getElementById("name").innerText = musicList[currentIndex].name;
        audio[currentIndex].play()        
        document.getElementById("pause").style.display = "block";
        document.getElementById("play").style.display = "none";
        audio[index].currentTime = 0;
        progressBar.style.width = '0%';
    })
});

const playPause = document.getElementById("playPause");
playPause.addEventListener("click", function(){
    if(audio[currentIndex].paused){
        audio[currentIndex].play()
        document.getElementById("pause").style.display = "block";
        document.getElementById("play").style.display = "none";
    }
    else{audio[currentIndex].pause()
        document.getElementById("pause").style.display = "none";
        document.getElementById("play").style.display = "block";
    }
})
// _______________________progress bar_________________________________________________________

const progressBar = document.getElementById("song-progress");
const progressContainer = document.getElementById("song-line");
const Audio = [].slice.call(audio);
let duration; let currentTimeInSeconds; let progressPercentage; let override= true;

Audio.forEach((element, index) => {
    if(override){
    element.addEventListener("timeupdate", function() {
        const duration = audio[index].duration;
        const currentTimeInSeconds = audio[index].currentTime;    
        const progressPercentage = (currentTimeInSeconds / duration) * 100;
        progressBar.style.width = `${progressPercentage}%`;  
    });
    }
    progressContainer.addEventListener("click", function(event){
        override = false;
        duration = audio[index].duration;
        const clickPercent = (event.clientX - progressBar.getBoundingClientRect().left)/progressContainer.clientWidth;
        currentTimeInSeconds  = clickPercent*duration;   
        const progressPercent = (currentTimeInSeconds / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;  
        audio[index].currentTime = currentTimeInSeconds;
    });
});

const volumeSliderContainer = document.getElementById("volume-line");
const volumeSlider = document.getElementById("volumeControl");

// Set the initial volume value
let currentVolume = 1.0;
volumeSlider.style.width = `${currentVolume * 100}%`;

volumeSliderContainer.addEventListener("click", function(event) {
    const sliderWidth = volumeSliderContainer.clientWidth;
    const clickPosition = event.clientX - volumeSliderContainer.getBoundingClientRect().left;
    const percentage = clickPosition / sliderWidth;
    currentVolume = Math.min(Math.max(percentage, 0), 1);
    updateVolume();
});

function updateVolume() {
    volumeSlider.style.width = `${currentVolume * 100}%`;
    Audio.forEach((element) => {
        element.volume = currentVolume;
    });
}
// ____________________________________________________________________________________________________________________________________________





