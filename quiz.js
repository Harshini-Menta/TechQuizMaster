const quizData = [
        { 
            question: "What is the output of `print(2 ** 3)` in Python?", 
            options: ["6", "8", "9", "5"], 
            answer: "8" 
        },
        { 
            question: "Which of the following is a valid way to declare a variable in Java?", 
            options: ["int x = 10;", "x := 10", "var x == 10", "x = int(10)"], 
            answer: "int x = 10;" 
        },
        { 
            question: "Which of these is used to define a function in Python?", 
            options: ["function", "def", "func", "define"], 
            answer: "def" 
        },
        { 
            question: "What is the file extension for C language source files?", 
            options: [".java", ".py", ".cpp", ".c"], 
            answer: ".c" 
        },
        { 
            question: "Which keyword is used to create a class in Java?", 
            options: ["function", "class", "def", "struct"], 
            answer: "class" 
        },
        { 
            question: "How do you write a single-line comment in Python?", 
            options: ["// comment", "# comment", "<!-- comment -->", "/* comment */"], 
            answer: "# comment" 
        },
        { 
            question: "Which header file is needed for `printf()` in C?", 
            options: ["stdio.h", "iostream", "conio.h", "math.h"], 
            answer: "stdio.h" 
        },
        { 
            question: "What is the correct way to create a list in Python?", 
            options: ["list = (1, 2, 3)", "list = {1, 2, 3}", "list = [1, 2, 3]", "list = <1, 2, 3>"], 
            answer: "list = [1, 2, 3]" 
        },
        { 
            question: "Which of these is used for string concatenation in Java?", 
            options: ["&", "*", "+", "concat"], 
            answer: "+" 
        },
        { 
            question: "Which loop is guaranteed to execute at least once in C?", 
            options: ["for", "while", "do-while", "foreach"], 
            answer: "do-while" 
        },
        { 
            question: "Which tag is used to define a paragraph in HTML?", 
            options: ["<para>", "<p>", "<text>", "<h1>"], 
            answer: "<p>" 
        },
        { 
            question: "Which attribute is used to provide a unique name to an HTML element?", 
            options: ["class", "name", "id", "key"], 
            answer: "id" 
        },
        { 
            question: "What does the 'href' attribute in HTML specify?", 
            options: ["Header font", "Hyperlink reference", "HTML referrer", "None"], 
            answer: "Hyperlink reference" 
        },
        { 
            question: "Which HTML element is used to embed JavaScript code?", 
            options: ["<script>", "<js>", "<javascript>", "<code>"], 
            answer: "<script>" 
        },
        { 
            question: "How do you create a comment in HTML?", 
            options: ["// comment", "# comment", "** comment **", "<!-- comment -->"], 
            answer: "<!-- comment -->" 
        },
        { 
            question: "Which property is used in CSS to change text color?", 
            options: ["font-color", "color", "text-color", "style"], 
            answer: "color" 
        },
        { 
            question: "Which CSS property is used to change the background color?", 
            options: ["color", "background-color", "bgcolor", "background"], 
            answer: "background-color" 
        },
        { 
            question: "What symbol is used to select an ID in CSS?", 
            options: [".", "*", "&", "#"], 
            answer: "#" 
        },
        { 
            question: "Which is the correct syntax to make all `<p>` elements bold using CSS?", 
            options: ["p = bold;", "<p> {bold}", "p { font-weight: bold; }", "p.bold()"], 
            answer: "p { font-weight: bold; }" 
        },
        { 
            question: "How do you center a block element in CSS horizontally?", 
            options: ["margin: 0 auto;", "text-align: center;", "align: center;", "center: block;"], 
            answer: "margin: 0 auto;" 
        },
        { 
            question: "Which SQL statement is used to extract data from a database?", 
            options: ["GET", "SELECT", "EXTRACT", "OPEN"], 
            answer: "SELECT" 
        },
        { 
            question: "Which command is used to remove all records from a table in SQL?", 
            options: ["REMOVE", "DELETE", "TRUNCATE", "DROP"], 
            answer: "TRUNCATE" 
        },
        { 
            question: "What does SQL stand for?", 
            options: ["Structured Query Language", "Simple Query Language", "Sequential Query Language", "Server Query Language"], 
            answer: "Structured Query Language" 
        },
        { 
            question: "Which SQL clause is used to filter the result set?", 
            options: ["WHERE", "SELECT", "ORDER BY", "GROUP BY"], 
            answer: "WHERE" 
        },
        { 
            question: "How do you prevent SQL injection?", 
            options: ["By using comments", "By using semicolons", "By using prepared statements", "By using uppercase queries"], 
            answer: "By using prepared statements" 
        },
        { 
            question: "Which keyword is used to declare a variable in JavaScript?", 
            options: ["int", "define", "let", "declare"], 
            answer: "let" 
        },
        { 
            question: "Which method is used to write content to the web page in JavaScript?", 
            options: ["console.write()", "window.print()", "document.display()", "document.write()"], 
            answer: "document.write()" 
        },
        { 
            question: "What will `typeof []` return in JavaScript?", 
            options: ["object", "array", "list", "undefined"], 
            answer: "object" 
        },
        { 
            question: "What is the result of `3 + '3'` in JavaScript?", 
            options: ["6", "'33'", "NaN", "Error"], 
            answer: "'33'" 
        },
        { 
            question: "How can you convert a string to an integer in JavaScript?", 
            options: ["parseInt()", "int()", "Number()", "Both A and C"], 
            answer: "Both A and C" 
        }
    ];       

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionElement = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("final-score");
const resultContainer = document.querySelector(".result");
const restartBtn = document.querySelector(".restart-btn");
const nextBtn = document.querySelector(".next-btn");

function startTimer() {
    timeLeft = 30;
    timeDisplay.textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            disableOptions();
            nextBtn.style.display = "inline-block";
        }
    }, 1000);
}

function loadQuestion(index) {
    const q = quizData[index];
    questionElement.textContent = q.question;
    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");
        btn.onclick = () => selectOption(btn, q.answer);
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function selectOption(selectedBtn, correctAnswer) {
    disableOptions();

    if (selectedBtn.textContent === correctAnswer) {
        selectedBtn.classList.add("correct");
        score++;
        scoreDisplay.textContent = score;
    } else {
        selectedBtn.classList.add("incorrect");
        Array.from(optionsContainer.children).forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }

    clearInterval(timer);
    nextBtn.style.display = "inline-block";
}


function disableOptions() {
    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
    });
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion(currentQuestion);
    } else {
        showResult();
    }
});

function showResult() {
    questionElement.style.display = "none";
    optionsContainer.style.display = "none";
    nextBtn.style.display = "none";

    const totalQuestions = quizData.length;
    const scoreRatio = `${score} / ${totalQuestions}`;

    finalScoreDisplay.textContent = `You scored ${score} out of ${totalQuestions}`;
    document.querySelector(".score-ratio").style.display = "block";
    document.getElementById("score-ratio").textContent = scoreRatio;

    resultContainer.style.display = "block";
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = "30";
    resultContainer.style.display = "none";
    document.querySelector(".score-ratio").style.display = "none";
    questionElement.style.display = "block";
    optionsContainer.style.display = "block";
    loadQuestion(currentQuestion);
});




loadQuestion(currentQuestion);