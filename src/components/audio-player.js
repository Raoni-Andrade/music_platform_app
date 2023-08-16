document.addEventListener('DOMContentLoaded', () => {
  const audioPlayer = document.getElementById('audioPlayer');
  const playButton = document.getElementById('playButton');
  const pauseButton = document.getElementById('pauseButton');
  const stopButton = document.getElementById('stopButton');

  // Play button click event
  playButton.addEventListener('click', () => {
    audioPlayer.play();
  });

  // Pause button click event
  pauseButton.addEventListener('click', () => {
    audioPlayer.pause();
  });

  // Stop button click event
  stopButton.addEventListener('click', () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  });
});

// Progress bar
const progressBar = document.getElementById('progressBar');
audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progress}%`;
});

// Volume control
const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('input', () => {
  audioPlayer.volume = volumeSlider.value;
});

// Time display
function formatTime(seconds) {
  const magic60 = 60;
  const magic10 = 10;
  const minutes = Math.floor(seconds / magic60);
  const remainingSeconds = Math.floor(seconds % magic60);
  return `${minutes}:${remainingSeconds < magic10 ? '0' : ''}${remainingSeconds}`;
}

const currentTimeDisplay = document.getElementById('currentTime');
audioPlayer.addEventListener('timeupdate', () => {
  const currentTime = formatTime(audioPlayer.currentTime);
  currentTimeDisplay.textContent = currentTime;
});
