const questions = [
    {
        question: "Who is president of india?",
        answers: [
            { text: "Narendr Modi", correct: true},
            { text: "Rahul Gandi", correct: false},
            { text: "Kejrivaal", correct: false},
            { text: "Mamta benrji", correct: false},
        ]
    },
    {
        question: "who is netional animal of india?",
        answers: [
            { text: "lion", correct: false},
            { text: "Lpped", correct: false},
            { text: "Tiger", correct: true},
            { text: "Elephant", correct: false},
        ]
    },
    {
        question: "Full from of HTML!",
        answers: [
            { text: "Hyper Test Markup Language", correct: false},
            { text: "Hyper Text Markup Language", correct: true},
            { text: "Harper Text Markup Language", correct: false},
            { text: "Hyper Txet Makeup Language ", correct: false},
        ]
    },
    {
        question: "Current population of india?",
        answers: [
            { text: "1420+ crores", correct: true},
            { text: "160 crores", correct: false},
            { text: "140 crores", correct: false},
            { text: "none of above", correct: false},
        ]
    },
    {
        question: "Which is the worst college in surat?",
        answers: [
            { text: "VT poddar college", correct: false},
            { text: "Bhagvan mahavir college", correct: false},
            { text: "Ambaba college", correct: false},
            { text: "Udhana college", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButtton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButtton.innerHTML = "Next";
    showQuestion();
} 

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn"); 
        answerButton.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButtton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const iscorrect = selectBtn.dataset.correct === "true";
    if(iscorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButtton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButtton.innerHTML = "Play Again"
    nextButtton.style.display = "block";
 }
function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length) {
        showQuestion();
    }else {
        showScore();
    }
}

nextButtton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();