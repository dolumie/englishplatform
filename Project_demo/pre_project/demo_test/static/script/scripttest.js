document.addEventListener('DOMContentLoaded', function() {
    const questionElement = document.getElementById('question');
    const answersContainer = document.getElementById('answers-btn');
    const nextButton = document.getElementById('btn-next');
    let currentTest = null;
    let currentQuestionIndex = 0;
    let userAnswers = [];

  
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('test_id');

    
    if (testId) {
        fetch(`/api/get-test/${testId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    currentTest = data;
                    showQuestion(currentQuestionIndex);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    function showQuestion(index) {
        const questions = currentTest.content.Questions;
        if (index >= questions.length) {
            showResults();
            return;
        }

        const question = questions[index];
        questionElement.textContent = question.Question;

     
        answersContainer.innerHTML = '';

      
        question.Answers.forEach((answer, answerIndex) => {
            const button = document.createElement('button');
            button.className = 'btn';
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(answerIndex + 1));
            answersContainer.appendChild(button);
        });

     
        let nextButtonContainer = document.querySelector('.next-button-container');
        if (!nextButtonContainer) {
            nextButtonContainer = document.createElement('div');
            nextButtonContainer.className = 'next-button-container';
            nextButtonContainer.appendChild(nextButton);
            document.querySelector('.container').appendChild(nextButtonContainer);
        }

       
        nextButton.style.display = 'none';
    }

    function selectAnswer(answerNumber) {
       
        const buttons = answersContainer.querySelectorAll('.btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        
        buttons[answerNumber - 1].classList.add('active');

        
        userAnswers[currentQuestionIndex] = answerNumber;

        
        nextButton.style.display = 'block';
    }

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < currentTest.content.Questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            showResults();
        }
    });

    function getFeedbackMessage(percentage) {
        if (percentage >= 90) {
            return {
                message: "Excellent! You're a master!",
                class: "excellent"
            };
        } else if (percentage >= 70) {
            return {
                message: "Great job! Keep it up!",
                class: "good"
            };
        } else if (percentage >= 50) {
            return {
                message: "Good effort! Room for improvement.",
                class: "average"
            };
        } else {
            return {
                message: "Keep practicing! You'll get better!",
                class: "needs-improvement"
            };
        }
    }

    function showResults() {
        const questions = currentTest.content.Questions;
        let score = 0;

       
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.Num_Right_Answer) {
                score++;
            }
        });

        
        const percentage = Math.round((score / questions.length) * 100);
        const feedback = getFeedbackMessage(percentage);

       
        const container = document.querySelector('.container');
        container.innerHTML = `
            <div class="header">
                <h1>Test Results</h1>
            </div>
            <div class="test-results">
                <div class="results-stats">
                    <div class="score">Score: ${score}/${questions.length}</div>
                    <div class="percentage">${percentage}%</div>
                </div>
                <div class="feedback ${feedback.class}">
                    ${feedback.message}
                </div>
                <button class="btn" onclick="window.location.href='/tests'">Back to Tests</button>
            </div>
        `;
    }
});
