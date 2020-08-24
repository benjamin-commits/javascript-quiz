// defining html elements as a var
var body = document.getElementById("quiz");
var fsEl = document.getElementById("finalScore");
var godiv = document.getElementById("gameover");
var qEl = document.getElementById("questions");
var qTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var scoreBtn = document.getElementById("submitScore");
var hiScore = document.getElementById("highscore-score");
var choiceA = document.getElementById("a");
var choiceB = document.getElementById("b");
var choiceC = document.getElementById("c");
var choiceD = document.getElementById("d");

// the quiz
var quizQuestions = [
    {

        question: "Inside which HTML element do we put the JavaScript?",
        choiceA: "script",
        choiceB: "js",
        choiceC: "javascript",
        choiceD: "scripting",
        correctAnswer: "a",
    
    },
    {
        question: "What is Javascript?",
        choiceA: "A coding language",
        choiceB: "Coffee beans",
        choiceC: "Not sure",
        choiceD: "It's complicated",
        correctAnswer: "a",
    },
    
    {
        question: "Where is the correct place to insert a JavaScript?",
        choiceA: "The head section",
        choiceB: "The body section",
        choiceC: "The html section",
        choiceD: "Both the head section and the body section are correct",
        correctAnswer: "d",                  
    },
    
    {
        question: "What is the correct syntax for referring to an external script called xxx.js?",
        choiceA: "script href='xxx.js'",
        choiceB: "script src='xxx.js'",
        choiceC: "script name='xxx.js'",
        choiceD: "#script-href='xxx.js'",
        correctAnswer: "b",
    },
    
    {
        question: "The external JavaScript file must contain the script tag",
        choiceA: "False",
        choiceB: "True",
        choiceC: "Sometimes",
        choiceD: "Never",
        correctAnswer: "a",
    },
        
    
];
// more var
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// displays quiz questions
function generateQuizQuestion(){
    godiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    qEl.innerHTML = currentQuestion.question;
    choiceA.innerHTML = currentQuestion.choiceA;
    choiceB.innerHTML = currentQuestion.choiceB;
    choiceC.innerHTML = currentQuestion.choiceC;
    choiceD.innerHTML = currentQuestion.choiceD;
};

// function to start quiz
function startQuiz(){
    godiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        qTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    body.style.display = "block";
}
// show score once done
function showScore(){
    body.style.display = "none"
    godiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    fsEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}


scoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Please enter a valid name");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        godiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    hiScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        hiScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages from 
function showHighscore(){
    startQuizDiv.style.display = "none"
    godiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    hiScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    godiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);