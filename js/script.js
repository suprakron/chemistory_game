// Initial progress value
let progress = 0;

// Function to update the progress bar
function updateProgress(increment) {
    progress += increment;
    if (progress > 100) {
        progress = 100; // Maximum value for the progress bar
    }
    document.getElementById('progress-bar').style.width = progress + '%';
}

// Function to be called when clicking "Water Plants"
function waterPlants() {
    // Call updateProgress with the desired increment
    updateProgress(10); // Adjust the increment value as needed
}

document.addEventListener('DOMContentLoaded', () => {
    const collectPointsButton = document.querySelector('.collect-points-button');
    const quizContainer = document.getElementById('quiz-container');
    const popup = document.getElementById('popup');

 
    function showQuizContainer() {
        quizContainer.style.display = 'block';  
        fetchQuizData(); 
        popup.style.display = 'flex';  
    }

 
    function hideQuizContainer() {
        quizContainer.style.display = 'none';  
        popup.style.display = 'none'; // Hide the popup
    }

    // Function to close the popup
    function closePopup() {
        hideQuizContainer(); // Hide both quiz container and popup
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

    // Function to check answers
    function checkAnswers() {
        // Update the quiz data here if needed, or keep it in memory
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

        alert(`คะแนนของคุณ: ${score}/${quizData.length}`);
    }

    // Event listener for showing quiz container
    collectPointsButton.addEventListener('click', () => {
        showQuizContainer();
    });

    // Event listener for checking answers
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('check-answers-button')) {
            checkAnswers();
        }
    });

    // Initial hide
    hideQuizContainer();
});
