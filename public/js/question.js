// Define the quiz HTML content
const quizHTML = `
    <form id="quiz-form">
        <fieldset>
            <legend>ข้อใดกล่าวถึงการเกิดปฏิกิริยาเคมีไม่ถูกต้อง</legend>
            <label>
                <input type="text" name="answer1" placeholder="กรอกคำตอบที่นี่" required>
            </label>
        </fieldset>
        <fieldset>
            <legend>ข้อใดไม่ใช่ตัวบ่งชี้ว่าเกิดปฏิกิริยาเคมี</legend>
            <label>
                <input type="text" name="answer2" placeholder="กรอกคำตอบที่นี่" required>
            </label>
        </fieldset>
        <button type="button" class="styled-button check-answers-button">ตรวจสอบคำตอบ</button>
    </form>
`;

// Function to insert the quiz HTML into the popup
const insertQuizHTML = () => {
    const quizContainer = document.createElement('div');
    quizContainer.id = 'quiz-container';
    quizContainer.innerHTML = quizHTML;
    document.querySelector('.quiz-popup-content').appendChild(quizContainer);
};

// Show the quiz popup
const showPopup = () => {
    document.querySelector('.quiz-popup').classList.add('show');
    document.querySelector('.quiz-popup-content').classList.add('show');
};

// Close the quiz popup
const closePopup = () => {
    document.querySelector('.quiz-popup').classList.remove('show');
    document.querySelector('.quiz-popup-content').classList.remove('show');
    setTimeout(() => {
        document.querySelector('.quiz-popup').style.display = 'none';
    }, 500); // Match the CSS transition time
};

// Add event listener to the Collect Points button
document.querySelector('.collect-points-button').addEventListener('click', () => {
    const popup = document.querySelector('.quiz-popup');
    if (!popup) {
        // Create and show the popup if it doesn't exist
        const popupElement = document.createElement('div');
        popupElement.className = 'quiz-popup';
        popupElement.innerHTML = `
            <div class="quiz-popup-content">
                <span class="close-btn" onclick="closePopup()">&times;</span>
            </div>
        `;
        document.body.appendChild(popupElement);
        insertQuizHTML();
    }
    document.querySelector('.quiz-popup').style.display = 'flex';
    showPopup();
});

// Add event listener to the Check Answers button
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('check-answers-button')) {
        checkAnswers();
    }
});

const checkAnswers = async () => {
    const correctAnswers = {
        answer1: 'มีทั้งการดูดพลังงานและคายพลังงาน',
        answer2: 'การเปลี่ยนสี'
    };

    let coinCount = parseInt(document.getElementById('coin-count').textContent, 10);

    const userAnswer1 = document.querySelector('input[name="answer1"]').value.trim();
    const userAnswer2 = document.querySelector('input[name="answer2"]').value.trim();

    if (userAnswer1 && userAnswer2) {
        const isCorrect1 = userAnswer1 === correctAnswers.answer1;
        const isCorrect2 = userAnswer2 === correctAnswers.answer2;

        if (isCorrect1 && isCorrect2) {
            coinCount++;
            document.getElementById('coin-count').textContent = coinCount;

            // Save to database
            try {
                await fetch('/save-answers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        answer1: userAnswer1,
                        answer2: userAnswer2,
                        coinCount: coinCount
                    })
                });
            } catch (error) {
                console.error('Error saving answers:', error);
            }

            closePopup();  
        } else {
            // Show correct answers
            let feedback = '';
            if (!isCorrect1) {
                feedback += `ข้อที่ 1: คำตอบที่ถูกต้องคือ "${correctAnswers.answer1}"\n`;
            }
            if (!isCorrect2) {
                feedback += `ข้อที่ 2: คำตอบที่ถูกต้องคือ "${correctAnswers.answer2}"\n`;
            }
            alert('คำตอบไม่ถูกต้อง\n' + feedback);  
        }
    } else {
        alert('กรุณากรอกคำตอบทุกข้อ');
    }
};
