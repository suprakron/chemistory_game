// Initial progress value
let progress = 0;

// Function to update the progress bar
// Function to update the progress bar
function updateProgress(increment) {
    progress += increment;
    if (progress > 100) {
        progress = 100; // Maximum value for the progress bar
    }
    console.log('Updating progress to:', progress + '%'); // Log progress value
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
// Function to show correct answer feedback
function showCorrectAnswerFeedback(correctAnswers) {
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = `<p>คำตอบที่ถูกต้อง: ${correctAnswers.join(', ')}</p>`;
    feedback.style.display = 'block';
}

// Function to get the number of correct answers
function getCorrectAnswersCount() {
    const quizData = [
        {
            "id": "question1",
            "correctAnswer": "3"
        },
        {
            "id": "question2",
            "correctAnswer": "2"
        }
    ];

    let score = 0;
    const correctAnswers = [];

    quizData.forEach(question => {
        const selectedOption = document.querySelector(`input[name="${question.id}"]:checked`);
        if (selectedOption && selectedOption.value === question.correctAnswer) {
            score++;
        } else {
            correctAnswers.push(question.correctAnswer);
        }
    });

    return { score, correctAnswers };
}

document.addEventListener('DOMContentLoaded', () => {
    const checkAnswersButton = document.querySelector('.check-answers-button');
    const progressBar = document.getElementById('progress-bar');
    const popup = document.getElementById('popup');
    const quizContainer = document.getElementById('quiz-container');
    const collectPointsButton = document.querySelector('.collect-points-button');
    const coinCount = document.getElementById('coin-count');

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

    // Function to be called when clicking "Water Plants"
    function waterPlants() {
        updateProgress(10); // Adjust the increment value as needed
    }

    // Function to show quiz container and fetch quiz data
    function showQuizContainer() {
        quizContainer.style.display = 'block';
        fetchQuizData();
    }

    // Function to hide quiz container and popup
    function hideQuizContainer() {
        quizContainer.style.display = 'none';
        popup.style.display = 'none'; // Hide the popup
    }

    // Function to close the popup and navigate to level2.html
    function closePopup() {
        popup.style.display = 'none'; // Hide the popup
        window.location.href = 'level2.html'; // Redirect to the next level
    }

    // Function to fetch quiz data from JSON file
    async function fetchQuizData() {
        try {
            const response = await fetch('../data/quiz-data.json');
            const quizData = await response.json();

            const quizHTML = quizData.map(question => `
                <fieldset>
                    <legend>${question.question}</legend>
                    ${question.options.map(option => `
                        <label>
                            <input type="radio" name="${question.id}" value="${option.value}"> ${option.text}
                        </label>
                    `).join('')}
                </fieldset>
            `).join('') + `
                <button type="button" class="styled-button check-answers-button">ตรวจสอบคำตอบ</button>
            `;

            quizContainer.innerHTML = quizHTML; // Insert quiz HTML into the container
        } catch (error) {
            console.error('Error fetching quiz data:', error);
            quizContainer.innerHTML = '<p>ไม่สามารถโหลดคำถามได้</p>';
        }
    }

    // Function to save score to the server
    async function saveScore(name, userClass, level, score) {
        try {
            const response = await fetch('/save-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, class: userClass, level, score })
            });
    
            const result = await response.json();
            if (response.ok) {
                alert('คะแนนของคุณถูกบันทึกแล้ว!');
            } else {
                console.error('Error saving score:', result.error);
                alert('ไม่สามารถบันทึกคะแนนได้');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('ไม่สามารถบันทึกคะแนนได้');
        }
    }

    // Function to get the number of correct answers
    function getCorrectAnswersCount() {
        const quizData = [
            {
                "id": "question1",
                "correctAnswer": "3"
            },
            {
                "id": "question2",
                "correctAnswer": "2"
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

    // Event listener for showing quiz container
    collectPointsButton.addEventListener('click', () => {
        showQuizContainer();
    });

    // Event listener for checking answers
    checkAnswersButton.addEventListener('click', () => {
        const correctAnswers = getCorrectAnswersCount(); // Get the number of correct answers

        let progressWidth = 0;
        if (correctAnswers === 1) {
            progressWidth = 50; // 50% fill
        } else if (correctAnswers === 2) {
            progressWidth = 100; // 100% fill
        }

        // Update the progress bar
        updateProgress(progressWidth);

        // Show the popup and fireworks if the progress is full
        if (progressWidth === 100) {
            showFireworks(); // Show fireworks effect
            setTimeout(() => {
                popup.style.display = 'flex'; // Show popup
                popup.classList.add('show'); // Add show class for animation
            }, 500); // Delay to allow progress bar animation
        }

        // Update coin count
        coinCount.textContent = parseInt(coinCount.textContent) + correctAnswers;
    });

    // Event listener for closing popup and navigating to level2.html
    document.querySelector('.popup-content .close-popup').addEventListener('click', () => {
        closePopup();
    });

    // Initial hide
    hideQuizContainer();
});
