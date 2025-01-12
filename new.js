const welcomeScreen = document.getElementById("welcomeScreen");
const quizArea = document.getElementById("quizArea");
const resultScreen = document.getElementById("resultScreen");
const timerText = document.getElementById("timer");

const levels = [
    '₹ 1,000,000',
    '₹ 5,00,000',
    '₹ 2,50,000',
    '₹ 1,25,000',
    '₹ 64,000',
    '₹ 32,000',
    '₹ 16,000',
    '₹ 8,000',
    '₹ 4,000',
    '₹ 2,000',
    '₹ 1,000',
    '₹ 500',
    '₹ 300',
    '₹ 200',
    '₹ 100'
]

const questions = [
    {
      question: "In which year did World War II end??",
      options: ["1942", "1944", "1950", "1945"],
      answer: 3
    },
    {
      question: "Which element has the chemical symbol 'Hg'?",
      options: ["Helium", "Mercury", "Gold", "Hydrogen"],
      answer: 1
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: 1
    },
    {
      question: "Which is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      answer: 1
    },
    {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Montreal","Ottawa"],
        answer: 3
      },
      {
        question: "Which country was the first to grant women the right to vote?",
        options: ["United States", "United Kingdom", "New Zealand", "Australia"],
        answer: 3
      },
      {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Diamond", "Iron", "Titanium"],
        answer: 1
      },
      {
        question: " In which year did the first manned moon landing occur?",
        options: ["1969", "1972", "1954", "1965"],
        answer: 0
      },
      {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Yen", "Ringgit","Won"],
        answer: 1
      },
      {
        question: "Who discovered the law of gravity?",
        options: ["Albert Einstein", " Nikola Tesla", " Galileo Galilei", "Isaac Newton"],
        answer: 3
      },
      {
        question: "Which country is the largest producer of coffee in the world?",
        options: ["U.S.A", "Brazil", "Vietnam", "Indonesia"],
        answer: 1
      },
      {
        question: "What is the currency of South Korea?",
        options: ["Yen", "Ringgit", "Won", "Baht"],
        answer: 2
      },
      {
        question: "Which is the smallest country in Africa by area?",
        options: ["Seychelles", "Guinea-Bissau", "Gambia"," São Tomé and Príncipe"],
        answer: 2
      },
      {
        question: " Who was the first emperor of China?",
        options: ["Qin Shi Huang", "Kublai Khan", "Sun Yat-sen", "Confucius"],
        answer: 0
      },
      {
        question: " Which gas makes up the majority of Earth's atmosphere?",
        options: ["Carbon Dioxide", "Hydrogen", "Nitrogen", "Oxygen"],
        answer: 2
      },
      {
        question: "Who wrote the book One Hundred Years of Solitude??",
        options: ["Gabriel García Márquez", " Mario Vargas Llosa", "Julio Cortázar", "Isabel Allende"],
        answer: 0
      }
];

let currentLevelIndex = levels.length - 1;
let currentQuestionIndex = 0;
let winningAmount = "₹ 0";
let timeInterval = 30;
let interval;

function startGame() {
    const username = document.getElementById("username").value;
    const error = document.getElementById("usernameError");

    if(username.trim() === ""){
        error.innerHTML = "Please enter username";
        return;
    }

    error.innerHTML = "";
    welcomeScreen.classList.add("hide");
    quizArea.classList.remove("hide");
    loadLevels();
    loadQuestion();
}

function loadLevels() {
    const levelList = document.getElementById("levelList");
    levelList.innerHTML = "";
    levels.forEach((level, index)=>{
        const levelDiv = document.createElement("li");
        levelDiv.classList.add("level");
        levelDiv.innerHTML = `
          <span class="levelNumber">${levels.length - index}</span>
          <span class="levelAmount">${level}</span>
        `;
        if(currentLevelIndex === index){
            levelDiv.classList.add("active");
        }
        levelList.appendChild(levelDiv);
    })
}
function loadQuestion() {
    const questionStatement = document.getElementById("questionStatement");
    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    const currentQuestion = questions[currentQuestionIndex];

    questionStatement.innerHTML = currentQuestion.question;
    currentQuestion.options.forEach((option,index)=>{
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("answer");
        answerDiv.innerHTML = option;
        answerDiv.addEventListener("click", () => checkAnswer(index));
        answers.appendChild(answerDiv);
    })

    timeInterval = 30;
    interval = setInterval(timer,1000)
}

function timer() {
    if(timeInterval == 0){
        clearInterval(interval);
        manageResut();
    }
    timerText.innerHTML = timeInterval;
    timeInterval--;
}


function checkAnswer(option) {
    const currentQuestion = questions[currentQuestionIndex];

    if(option !== currentQuestion.answer){
        manageResut()
    }
    currentQuestionIndex++;
    winningAmount = levels[currentLevelIndex];
    currentLevelIndex--;
    clearInterval(interval);
    if(currentLevelIndex < 0){
        manageResut(true)
    }
    loadLevels();
    loadQuestion();
}

function manageResut(userWon = false) {
    const priceMoney = document.getElementById("priceMoney");
    const message = document.getElementById("message");
    if(userWon){
        priceMoney.innerHTML = `You won: ${levels[0]}`;
        message.innerHTML = "Congratulations!"
        quizArea.classList.add("hide");
        resultScreen.classList.remove("hide");
        return;
    }
    priceMoney.innerHTML = `You won: ${winningAmount}`;
    quizArea.classList.add("hide");
    resultScreen.classList.remove("hide");
}