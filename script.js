const questions = [
    {
        question: "The “Father of Artificial Intelligence” is:",
        answers: [
            {
                answer: "alan turing",
                correct: false
            }
            ,
            {
                answer: "charles babbage",
                correct: false
            }
            ,
            {
                answer: "john mccarthy",
                correct: true
            }
            , {
                answer: "none",
                correct: false
            }
        ]
    },
    {
        question: "Which of the following is the common language for Artificial Intelligence?",
        answers: [
            {
                answer: "python",
                correct: true
            }
            ,
            {
                answer: "java",
                correct: false
            }
            ,
            {
                answer: "lisp",
                correct: false
            }
            , {
                answer: "php",
                correct: false
            }
        ]
    },
    {
        question: " Blind Search can be used for which of the following situations?",
        answers: [
            {
                answer: "real life simulation",
                correct: false
            }
            ,
            {
                answer: "small search space",
                correct: true
            }
            ,
            {
                answer: "game heory",
                correct: false
            }
            , {
                answer: "none",
                correct: false
            }
        ]
    }
]


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestions();
}


function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.answer;
        button.classList.add("btn")
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)

    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");

    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "Block";

}


nextButton.addEventListener("click", nextquestion)

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "PLay Again";
    nextButton.style.display = "Block";

}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    }
    else {
        showScore();
    }

}

function nextquestion() {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }

}
startQuiz();