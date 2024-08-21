let progress = 0;

// Function to update the progress bar
function updateProgress(increment) {
    progress += increment;
    if (progress > 100) {
        progress = 100; // Maximum value for the progress bar
    }
    document.getElementById('progress-bar').style.width = progress + '%';
}

// Function to show fireworks effect
function showFireworks() {
    const fireworks = document.createElement('div');
    fireworks.className = 'fireworks';
    document.body.appendChild(fireworks);

    setTimeout(() => {
        fireworks.remove();
    }, 3000); // Adjust duration for fireworks display
}

// Function to get the number of correct answers
function getCorrectAnswersCount() {
    const quizData = [
        {
            id: "question1",
            correctAnswer: "มีทั้งการดูดพลังงานและคายพลังงาน" // Update with correct answer
        },
        {
            id: "question2",
            correctAnswer: "การเปลี่ยนสี" // Update with correct answer
        }
    ];
    let score = 0;

    quizData.forEach(question => {
        const selectedOption = document.querySelector(`input[name="${question.id}"]:checked`);
        if (selectedOption && selectedOption.value === question.correctAnswer) {
            score++;
        }
    });

    return score;
}

// Function to show quiz popup
function showQuizPopup() {
    const quizPopup = document.getElementById('quiz-popup');
    quizPopup.style.display = 'flex';
    setTimeout(() => {
        quizPopup.style.opacity = 1;
    }, 10);
}

// Function to close quiz popup
function closeQuizPopup() {
    const quizPopup = document.getElementById('quiz-popup');
    quizPopup.style.opacity = 0;
    setTimeout(() => {
        quizPopup.style.display = 'none';
    }, 300);
}

// Function to show result popup
function showResultPopup(score) {
    const resultPopup = document.getElementById('result-popup');
    resultPopup.querySelector('p').textContent = `You scored ${score} point(s)!`;
    resultPopup.style.display = 'flex';
    setTimeout(() => {
        resultPopup.style.opacity = 1;
    }, 10);
}

// Function to close result popup and go to the next level
function closeResultPopup() {
    const resultPopup = document.getElementById('result-popup');
    resultPopup.style.opacity = 0;
    setTimeout(() => {
        resultPopup.style.display = 'none';
        showFireworks();
        window.location.href = 'level2.html'; // Redirect to next level
    }, 300);
}

// Add event listener to check answers button
document.querySelector('.check-answers-button').addEventListener('click', function() {
    console.log('Check Answers button clicked');
    const score = getCorrectAnswersCount();
    console.log('Score:', score);
    updateProgress(score * 50); // Update progress based on score
    closeQuizPopup(); // Close the quiz popup first
    showResultPopup(score); // Show the result popup with score
});


document.querySelector('#result-popup .close-popup').addEventListener('click', closeResultPopup);

document.querySelector('#quiz-popup .close-popup').addEventListener('click', closeQuizPopup);

document.querySelector('.collect-points-button').addEventListener('click', showQuizPopup);
