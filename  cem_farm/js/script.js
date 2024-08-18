let coinCount = 0;
let progress = 0;

function plantSeed(plot) {
    if (!plot.classList.contains('planted')) {
        plot.classList.add('planted');
        const plant = document.createElement('div');
        plant.classList.add('plant');
        plot.appendChild(plant);
    }
}

function waterPlants() {
    const plants = document.querySelectorAll('.planted .plant');
    const coinsToAdd = plants.length;
    
    // Animate the coin count
    animateCoinCount(coinCount, coinCount + coinsToAdd);
    coinCount += coinsToAdd;

    // Increment the progress bar
    if (progress < 100) {
        progress += 20; // Adjust this value as needed
        document.getElementById('progress-bar').style.width = progress + '%';
    }
    
    // Show popup when the progress bar is full
    if (progress >= 100) {
        progress = 0;
        setTimeout(() => {
            document.getElementById('progress-bar').style.width = '0%';
        }, 500); // 0.5 second delay before resetting

        // Display the popup
        document.getElementById('popup').style.display = 'flex';
    }
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function animateCoinCount(start, end) {
    const duration = 1000; // Duration of the animation in milliseconds
    const increment = (end - start) / (duration / 10);
    let currentCount = start;
    const interval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= end) {
            currentCount = end;
            clearInterval(interval);
        }
        document.getElementById('coin-count').textContent = Math.floor(currentCount);
    }, 10);
}
