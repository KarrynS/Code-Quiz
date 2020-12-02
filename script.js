//Grabbing elements from HTML
var mainTitleEl = document.querySelector("#mainTitleEl");
var mainBodyEl = document.querySelector("#mainBodyEl");
var timerEl = document.querySelector("#timeLeft");
var StartBtn = document.querySelector("#startButton");

var timeLeft = 75;
var score = 0;
var qNumber = 1;  // Starting with Question 1
var timeInterval;

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


//Add Eventlistener for Start Quiz button
StartBtn.addEventListener("click", startQuiz);

//Start timer once "Start Quiz" button clicked
var startQuiz = function () {
    //Initiate time
    timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft + "seconds remaining";
        console.log(timeLeft);

        //When time = 0, end quiz
        if (timeLeft = 0) {
            clearInterval(timeInterval);
            timeLeft = 0;
            stopQuiz();
        }
    }, 1000);
    
    displayQuestion();
};



//Display quiz questions
var displayQuestion = function () {


}



//Stop Quiz
var stopQuiz = function () {

}
