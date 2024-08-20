// Define the quiz HTML content
const quizHTML = `
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

const checkAnswers = () => {
    const correctAnswers = {
        1: 3,  
        2: 2   
    };

    let coinCount = parseInt(document.getElementById('coin-count').textContent, 10);
    
    const checkedAnswers1 = Array.from(document.querySelectorAll('input[name="question1"]:checked')).map(cb => cb.value);
    const checkedAnswers2 = Array.from(document.querySelectorAll('input[name="question2"]:checked')).map(cb => cb.value);

   
    if (checkedAnswers1.includes(correctAnswers[1].toString()) && checkedAnswers2.includes(correctAnswers[2].toString())) {
      
        coinCount++;
        document.getElementById('coin-count').textContent = coinCount;

       
        closePopup();  
    } else {
      
        alert('คำตอบไม่ถูกต้อง');  
    }
};