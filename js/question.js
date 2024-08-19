// Define the quiz HTML content
const quizHTML = `
    <div class="quiz-container" style="display: none;">
        <form id="quiz-form">
            <fieldset>
                <legend>ข้อใดกล่าวถึงการเกิดปฏิกิริยาเคมีไม่ถูกต้อง</legend>
                <label>
                    <input type="radio" name="question1" value="1"> ต้องมีสารใหม่เกิดขึ้น
                </label>
                <label>
                    <input type="radio" name="question1" value="2"> ต้องมีการเปลี่ยนสถานะของสารเสมอ
                </label>
                <label>
                    <input type="radio" name="question1" value="3"> มีทั้งการดูดพลังงานและคายพลังงาน
                </label>
                <label>
                    <input type="radio" name="question1" value="4"> ถ้าเป็นระบบปิดจะเป็นไปตามกฎทรงมวล
                </label>
            </fieldset>
            <fieldset>
                <legend>ข้อใดไม่ใช่ตัวบ่งชี้ว่าเกิดปฏิกิริยาเคมี</legend>
                <label>
                    <input type="radio" name="question2" value="1"> การตกตะกอน
                </label>
                <label>
                    <input type="radio" name="question2" value="2"> การเกิดฟองแก๊ส
                </label>
                <label>
                    <input type="radio" name="question2" value="3"> การเกิดความร้อน
                </label>
                <label>
                    <input type="radio" name="question2" value="4"> การเปลี่ยนสี
                </label>
            </fieldset>
            <button type="button" class="styled-button check-answers-button">ตรวจสอบคำตอบ</button>
        </form>
        <span class="close-btn" onclick="closePopup()">×</span>
    </div>
`;

// Function to insert the quiz HTML into the page
const insertQuizHTML = () => {
    const quizContainer = document.createElement('div');
    quizContainer.id = 'quiz-container'; // Set ID to target for removal
    quizContainer.innerHTML = quizHTML;
    document.body.appendChild(quizContainer);
};

// Call the function to insert the quiz HTML when needed
document.addEventListener('DOMContentLoaded', () => {
    insertQuizHTML();

    // Add event listener to the Collect Points button
    document.querySelector('.collect-points-button').addEventListener('click', () => {
        const quizContainer = document.querySelector('.quiz-container');
        if (quizContainer) {
            quizContainer.style.display = 'block';
        }
    });

    // Add event listener to the Check Answers button
    document.querySelector('.quiz-container').addEventListener('click', (event) => {
        if (event.target.classList.contains('check-answers-button')) {
            checkAnswers();
        }
    });
});

// Function to check answers
const checkAnswers = () => {
    const correctAnswers = {
        1: 2, // For the first question, the correct answer is option 2
        2: 3  // For the second question, the correct answer is option 3
    };

    let coinCount = parseInt(document.getElementById('coin-count').textContent, 10);
    
    const checkedAnswers1 = Array.from(document.querySelectorAll('input[name="question1"]:checked')).map(cb => cb.value);
    const checkedAnswers2 = Array.from(document.querySelectorAll('input[name="question2"]:checked')).map(cb => cb.value);

    // Check if answers are correct
    if (checkedAnswers1.includes(correctAnswers[1].toString()) && checkedAnswers2.includes(correctAnswers[2].toString())) {
        // Increment coin count and show the correct answer popup
        coinCount++;
        document.getElementById('coin-count').textContent = coinCount;
        showPopup('คำตอบถูกต้อง!', 'correct');
    } else {
        // Show the incorrect answer popup
        showPopup('คำตอบไม่ถูกต้อง', 'incorrect');
    }
};

// Function to show the popup
const showPopup = (message, type) => {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-btn" onclick="closePopup()">×</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(popup);
    popup.style.display = 'block';
};

// Function to close the popup and the quiz
const closePopup = () => {
    document.querySelectorAll('.popup').forEach(popup => popup.remove());
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        quizContainer.style.display = 'none';
    }
};
