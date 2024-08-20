let coinCount = 0;

function updateCoins() {
    coinCount++;
    document.getElementById('coin-count').textContent = coinCount;

    if (coinCount % 5 === 0) {
        triggerTrophyEffect();
        changeBackground();
        triggerFireworks();
    }
}

function triggerTrophyEffect() {
    const trophyIcon = document.querySelector('.trophy-icon-container i');
    const colors = ['gold', 'silver', 'bronze', 'purple', 'green'];
    const colorIndex = (coinCount / 5 - 1) % colors.length;

    trophyIcon.style.color = colors[colorIndex];
    trophyIcon.classList.add('animate-trophy');
    setTimeout(() => trophyIcon.classList.remove('animate-trophy'), 1000);
}

function changeBackground() {
    document.body.style.backgroundImage = "url('./img/rain.webp')";
}

function triggerFireworks() {
    const fireworks = document.createElement('div');
    fireworks.className = 'fireworks';
    document.body.appendChild(fireworks);

    setTimeout(() => {
        document.body.removeChild(fireworks);
    }, 3000);
}

document.querySelector('.collect-points-button').addEventListener('click', updateCoins);
