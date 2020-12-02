//Grabbing elements from HTML
var mainTitleEl = document.querySelector("#mainTitleEl");
var mainBodyEl = document.querySelector("#mainBodyEl");
var timerEl = document.querySelector("#timeLeft");

var timeLeft = 75;
var score = 0;

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

//Add Eventlistener for Start Quiz button
$("#startButton").on("click", startQuiz);

//Loading quiz timer
var startQuiz = function () {
    
    //Clearing homepage content
    document.getElementById("content").style.display = 'none';
    startBtn.style.display = 'none';

    //Initiate timer
    var timeInterval;
    timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds remaining";
        
        //console.log(timeLeft);
       // console.log(timeInterval);

        //When time = 0, stop quiz
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timeLeft = 0;
            stopQuiz();

            console.log(timeLeft);
        }
    }, 1000);

    displayQuestion();
};

//Loading quiz questions and choices to HTML
var displayQuestion = function ( ) {
   
    for (var i=0; i < questions.length; i++) {
        //Display questions to HTML
        mainTitleEl.textContent = questions[i].title;
    
        //Display answers to HTML 
        var button = document.createElement("button");
        mainBodyEl.append(button);
        button.textContent = questions[i].choices;
    
        //------>Need to convert answers to individual buttons-----<//
    
    
        // On clicking an answer button, load next question
        $("Button").on("click", clickedAnswer);
    }
    }

//Registering participants answer
var clickedAnswer = function(e) {
    //Check for correct answer
    var playerAnswer = questions[i].choices.indexOf(e.target.innerHTML);
    if(playerAnswer === questions[i].answer){
        $(mainBodyEl).append("<div class='answerValidation'>Correct");
    } else {
        //Penalise time if wrong answer
        timeLeft = timeLeft - 10;
        $(mainBodyEl).append("<div class='answerValidation'>Wrong");
    }
    //Load subsequent questions
    ////------->?????<---------- 
}



//Stop Quiz
var stopQuiz = function () {
    //Display timer
    timerEl.append(timeLeft);

    //Clear timer
    clearInterval(timeInterval);

    //Adjusting HTML form
    mainTitleEl.textContent = "End of Quiz";
    mainBodyEl.textContent = "You quiz score is" + score;
    
    //creating submission for name input
    var div = document.body.child[1].createElement("div");
    document.body.child[1].append(div);
    var nameBtn = document.body.child[1].createElement("button");
    document.body.child[1].append(nameBtn);


}














//var div = document.createElement("div");
//document.body.children[1].append(div);
//div.id = "startButtonDiv";


/*
var displayQuestion = function ( ) {
   
    for (var i=0; i < questions.length; i++) {
        //Display questions to HTML
        mainTitleEl.textContent = questions[i].title;
    
        //Display answers to HTML 
        var button = document.createElement("button");
        mainBodyEl.append(button);
        var possibleChoices = questions[i].choices;
        button.textContent = possibleChoices;
    
        //------>Need to convert answers to individual buttons-----<//
    
    
        // On clicking an answer button, load next question
        $("Button").on("click", clickedAnswer);
    }
    }
    */