const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const volume = document.querySelector('input[name="volume"]');
const playbackSpeed = document.querySelector('input[name="playbackSpeed"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

// play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = "❚ ❚";
  } else {
    video.pause();
    toggle.textContent = "►";
  }
}

// update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// seek video when clicking progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// volume control
volume.addEventListener('input', () => {
  video.volume = volume.value;
});

// speed control
playbackSpeed.addEventListener('input', () => {
  video.playbackRate = playbackSpeed.value;
});

// skip buttons
skipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    video.currentTime += parseFloat(btn.dataset.skip);
  });
});

// progress events
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
