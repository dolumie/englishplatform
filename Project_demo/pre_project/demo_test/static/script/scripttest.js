document.addEventListener('DOMContentLoaded', function() {
    const questionElement = document.getElementById('question');
    const answersContainer = document.getElementById('answers-btn');
    const nextButton = document.getElementById('btn-next');
    let currentTest = null;
    let currentQuestionIndex = 0;
    let userAnswers = [];

    // Get test ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('test_id');

    // Fetch test data
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

        // Clear previous answers
        answersContainer.innerHTML = '';

        // Create answer buttons
        question.Answers.forEach((answer, answerIndex) => {
            const button = document.createElement('button');
            button.className = 'btn';
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(answerIndex + 1));
            answersContainer.appendChild(button);
        });

        // Create next button container if it doesn't exist
        let nextButtonContainer = document.querySelector('.next-button-container');
        if (!nextButtonContainer) {
            nextButtonContainer = document.createElement('div');
            nextButtonContainer.className = 'next-button-container';
            nextButtonContainer.appendChild(nextButton);
            document.querySelector('.container').appendChild(nextButtonContainer);
        }

        // Hide next button until answer is selected
        nextButton.style.display = 'none';
    }

    function selectAnswer(answerNumber) {
        // Remove active class from all buttons
        const buttons = answersContainer.querySelectorAll('.btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        // Add active class to selected button
        buttons[answerNumber - 1].classList.add('active');

        // Store the answer
        userAnswers[currentQuestionIndex] = answerNumber;

        // Show next button
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

        // Calculate score
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.Num_Right_Answer) {
                score++;
            }
        });

        // Calculate percentage
        const percentage = Math.round((score / questions.length) * 100);
        const feedback = getFeedbackMessage(percentage);

        // Show results
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
