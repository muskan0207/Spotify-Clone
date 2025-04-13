console.log("Welcome to Spotify Clone");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let currentSong = document.getElementById('currentSong');
let songItemContainer = document.querySelector('.songItemContainer');

let songs = [
  { songName: "Warriyo - Mortals [NCS Release]", filePath: "Songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Celio - Huma-Huma", filePath: "Songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "DEAF KEV - Invisible", filePath: "Songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Different Heaven - My Heart", filePath: "Songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Janji - Heroes Tonight", filePath: "Songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Rabba - Salam-e-Ishq", filePath: "Songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Sakhiyaan", filePath: "Songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Bhula Dena", filePath: "Songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Tumhari Kasam", filePath: "Songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "Na Jaana", filePath: "Songs/10.mp3", coverPath: "covers/10.jpg" },
];

// Populate song list in UI
songs.forEach((song, i) => {
  let songItem = document.createElement('div');
  songItem.classList.add('songItem');
  songItem.innerHTML = `
    <img src="${song.coverPath}" alt="${i+1}">
    <span class="songName">${song.songName}</span>
    <span class="timestamp">3:45 <i class="far fa-circle-play playSong" data-index="${i}"></i></span>
  `;
  songItemContainer.appendChild(songItem);
});

// Handle master play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    currentSong.innerText = songs[songIndex].songName;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
  }
});

// Update progress bar as audio plays
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// Seek through song
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Play selected song from list
document.querySelectorAll('.playSong').forEach(button => {
  button.addEventListener('click', (e) => {
    songIndex = parseInt(e.target.getAttribute('data-index'));
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    currentSong.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
  });
});

// Next/Previous controls
document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  currentSong.innerText = songs[songIndex].songName;
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  currentSong.innerText = songs[songIndex].songName;
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
});
