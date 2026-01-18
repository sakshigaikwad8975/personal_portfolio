const questions = [
    {
        question: "What does FIFO stand for?",
        answers: [
            { text: "First In First Out", correct: true },
            { text: "Fast In First Out", correct: false },
            { text: "First In Fast Out", correct: false },
            { text: "Forward In Forward Out", correct: false }
        ]
    },
    {
        question: "Which language is the basic building block of the web?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "HTML", correct: true },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "Which of the following is an inline element?",
        answers: [
            { text: "Heading Tag", correct: false },
            { text: "Image Tag", correct: true },
            { text: "Div Tag", correct: false },
            { text: "Paragraph Tag", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Caste Style Sheet", correct: false },
            { text: "Cascading Sheet Style", correct: false },
            { text: "Catalogue Sheet Styling", correct: false },
            { text: "Cascading Style Sheet", correct: true }
        ]
    },
    {
        question: "Which language is used to make web pages responsive?",
        answers: [
            { text: "Java", correct: false },
            { text: "JavaScript", correct: true },
            { text: "HTML", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Given a sorted array, which technique finds a pair with sum X in O(n) time?",
        answers: [
            { text: "Binary Search", correct: false },
            { text: "Nested Loop", correct: false },
            { text: "Two Pointer Technique", correct: true },
            { text: "Hashing", correct: false }
        ]
    },
    {
        question: "Which keyword is used to create a subclass in Java?",
        answers: [
            { text: "extend", correct: true },
            { text: "implement", correct: false },
            { text: "inherit", correct: false },
            { text: "interface", correct: false }
        ]
    },
    {
        question: "Implicit return type of a class constructor is:",
        answers: [
            { text: "Destructor of class type", correct: false },
            { text: "Not of class type", correct: false },
            { text: "No return type", correct: false },
            { text: "Class type itself", correct: true }
        ]
    },
    {
        question: "What does debugging refer to in programming?",
        answers: [
            { text: "Writing code", correct: false },
            { text: "Testing code", correct: false },
            { text: "Fixing errors in code", correct: true },
            { text: "Documenting code", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a high-level programming language?",
        answers: [
            { text: "Assembly Language", correct: true },
            { text: "C++", correct: false },
            { text: "Python", correct: false },
            { text: "Java", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText =
        `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText =
        `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Restart Quiz";
    nextButton.style.display = "block";
    nextButton.onclick = startQuiz;
}

startQuiz();
