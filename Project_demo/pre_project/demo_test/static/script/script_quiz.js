const questions = [
    {
        question: "Alex ... to the college every day",
        answers: [
                { text: "goes", correct: true},
                { text: "went", correct: false},
                { text: "go", correct: false},
                { text: "gone", correct: false},
        ]
    },
    {
        question: "... Doluma do her homework yesterday?",
        answers: [
                { text: "did", correct: true},
                { text: "do", correct: false},
                { text: "does", correct: false},
                { text: "done", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answersButton = document.getElementById("answers-btn");
const nextButton = document.getElementById("btn-next");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answersButton.firstChild) {
        answersButton.removeChild(answersButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    }
        else {
        selectedButton.classList.add("wrong");
    }
    Array.from(answersButton.children).forEach(button=> {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "inline-block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score: ${score} of ${questions.length}`;
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
nextButton.addEventListener("click", ()=> {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();
