//Grabbing elements from HTML
var mainTitleEl = document.querySelector("#mainTitleEl");
var mainBodyEl = document.querySelector("#mainBodyEl");
var timerEl = document.querySelector("#timeLeft");

var timeLeft = 5;
var score = 0;
var timeInterval;
var qNumber = 0;

// list of all questions, choices, and answers
var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
  ];

//Generate 'Start Quiz' button on HTML
var startBtn = document.createElement("button");
document.body.children[1].append(startBtn);
startBtn.id = "startButton";
startBtn.textContent = "Start Quiz";


//Loading quiz timer
var startQuiz = function () {
    
    //Clearing homepage content
    document.getElementById("content").style.display = 'none';
    startBtn.style.display = 'none';

    //Begin countdown timer and display to HTML
    timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds remaining";

        //When time = 0, stop quiz
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            stopQuiz();
        }
    }, 1000);

    //Load Quiz questions
    displayQuestion();
};

//Add Eventlistener for Start Quiz button
$("#startButton").on("click", startQuiz);

//Loading quiz MCQ to HTML
var displayQuestion = function ( ) {
    //Display questions to HTML
        mainTitleEl.textContent = questions[qNumber].title;
        mainBodyEl.innerHTML = "";

        for (var j=0; j <questions[qNumber].choices.length; j++) {

        //Display answers to HTML 
        var button = document.createElement("button");
        mainBodyEl.appendChild(button);
        button.id = "choicesButton";
        button.textContent = questions[qNumber].choices[j];
        }
        console.log(questions[qNumber].title);
        console.log(questions[qNumber].choices);

        //--------->if questions completed before time=0 end game here--------//
        

        // On clicking an answer button, load next question
        $("Button").on("click", clickedAnswer);
    
}

//Registering participants answer
var clickedAnswer = function(e) {
    //Check for correct answer
    var playerAnswer = e.target.innerHTML;
    
    if(playerAnswer === questions[qNumber].answer){
        $(mainBodyEl).append("<hr>");
        $(mainBodyEl).append("<div class='answerValidation'>Correct ✅");
    } else {
        //Penalise time if wrong answer
        timeLeft = timeLeft - 10;
        $(mainBodyEl).append("<hr>");
        $(mainBodyEl).append("<div class='answerValidation'>Wrong ❌");
    }
    //Load subsequent questions
    qNumber++;
    setTimeout(displayQuestion, 600);
   
}

//Stop Quiz
var stopQuiz = function () {
    
    //Clear timer
    clearInterval(timeInterval);

    //Adjusting HTML form
    mainTitleEl.textContent = "End of Quiz";
    mainBodyEl.textContent = "You scored " + score;
    
    //Form for name submission
    var nameForm = $(`<form><input class="form-control" id="nameForm" type="text" placeholder="Enter your name into the leaderboard"></form`);
    $(mainBodyEl).append(nameForm);

    //Submitting score
    $(nameForm).submit(function(e) {
        e.preventDefault();
        nameSubmit();
    });
};

//Retrieve highscores from local storage
var highScoresObj = {};
if (localStorage.getItem ("highscores") ){
    highScoresObj = JSON.parse(localStorage.getItem("highscores"));
}

//Retrieve playerID from local storage
var playerId = 1;
if (localStorage.getItem("playerId")) {
    //playerId = JSON.parse(localStorage.getItem("playerId")) +1;
    playerId = parseInt(localStorage.getItem("playerId")) +1;
}

//Establishing Player Id
localStorage.setItem("playerId", playerId);

//Load Leader Board page
var loadHighScores = function() {
    // Clearing HTML body
    $(mainBodyEl).empty();
    $('#timeDisplay').empty();

    //Load Highsccores title
    mainTitleEl.textContent = "Highscores";

    //Load highscores and playerId to page
    $(mainBodyEl).append("<p id='highscorelist'>"+ playerId + " <span id=highscorescore>"+ highScoresObj+"</span></p");

    
    //Clear highscores
    var clearHighscores = function () {
        localStorage.clear();
        $("highscorelist").remove();
    }

    //Adding Clear Highscores Button
    var clearHighscoresBtn = document.createElement("button")
    document.body.children[1].append(clearHighscoresBtn);
    clearHighscoresBtn.id = "clearHighscores"
    clearHighscoresBtn.textContent = "Clear Highscores";
    $(clearHighscoresBtn).on("click", clearHighscores);

    //Adding Play Again button
    var reloadQuiz = () => location.reload();
    var playAgainBtn = document.createElement("button")
    document.body.children[1].append(playAgainBtn);
    playAgainBtn.id = "playagain"
    playAgainBtn.textContent = "Play Again";
    $(playAgainBtn).on("click", reloadQuiz);
    
}

//Handle submitting player ID to form and storing in local storage
var nameSubmit = function () {

    //Store name to local storage
    var nameInput = document.querySelector("#nameForm").value.trim();

    if (nameInput === "") {
        $("form").append("<p> Name cannot be left bank</p>");  
    } else {
        localStorage.setItem("playerId", JSON.stringify(nameInput));
        localStorage.setItem("highscores", JSON.stringify(score));

        //Load highscores page
        loadHighScores();
    }
}

//Event Listener for clicking "View Highscores" 
$("#viewHighscores").on("click", loadHighScores)

