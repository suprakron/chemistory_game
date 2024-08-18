// Create a new audio object
const audio = new Audio('../audio/cem.wav');

// Get the button and icon elements
const soundButton = document.getElementById('sound-button');
const soundIcon = document.getElementById('sound-icon');

// Track the playing status
let isPlaying = false;

// Function to toggle sound
soundButton.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        soundIcon.classList.remove('fa-volume-up');
        soundIcon.classList.add('fa-volume-mute');
    } else {
        audio.play();
        soundIcon.classList.remove('fa-volume-mute');
        soundIcon.classList.add('fa-volume-up');
    }
    isPlaying = !isPlaying;
});

// Reset icon when audio ends
audio.addEventListener('ended', function() {
    soundIcon.classList.remove('fa-volume-up');
    soundIcon.classList.add('fa-volume-mute');
    isPlaying = false;
});
