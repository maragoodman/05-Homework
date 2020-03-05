//Select container and button ids
var startHeader = document.querySelector("#start-header");
var startButton = document.querySelector("#start-button");
var nextButton = document.querySelector("#next-button");
var questionContainer = document.querySelector("#question-container");
var buttonContainer = document.querySelector("#button-container");

// Set up the questions
var question = [
  {
    question: "Which animal sleeps for only five minutes a day?",
    answers: ["A chameleon", "A koala", "A giraffe", "A beaver"],
    // correct answer is "A giraffe"
    answer: 2
  },
  {
    question: "The bikini was originally called the what?",
    answers: ["Poke", "Range", "Half", "Atom"],
    // correct answer is "Atom"
    answer: 3
  },
  {
    question: "Which European city is home to the Fairy Investigation Society?",
    answers: ["Poznan", "Dublin", "Bratislava", "Tallinn"],
    // correct answer is "Bratislava"
    answer: 2
  },
  {
    question: "Which one of these planets rotates clockwise?",
    answers: ["Uranus", "Mercury", "Mars", "Venus"],
    // correct answer is "Venus"
    answer: 3
  },
  {
    question: "Bubble gum contains what?",
    answers: ["Plastic", "Calcium", "Rubber", "Pepper"],
    // correct answer is "Rubber"
    answer: 2
  }
];

var questionCount = 0;
var score = 0;
var interval;
var totalSeconds = 200;

function startQuiz() {
  // changeStartContent();
  //This removes the start button, will change more than that at some point
  startButton.parentNode.removeChild(startButton);
  startHeader.parentNode.removeChild(startHeader);
  startTime();
  addQuestions();
}
//Edit text content of buttons
function removeContent() {
  for (var i = 0; i < 3; i++) {
    var btn = document.querySelector("#btn-0");
    var btn1 = document.querySelector("#btn-1");
    var btn2 = document.querySelector("#btn-2");
    btn.parentNode.removeChild(btn);
    btn1.parentNode.removeChild(btn1);
    btn2.parentNode.removeChild(btn2);
    addQuestions();
  }
}

function addQuestions() {
  for (var i = 0; i < question.length; i++) {
    if (questionCount === i) {
      question[i].answers.forEach((answer, index) => {
        var btn = document.createElement("button");
        questionContainer.textContent = question[i].question;
        btn.setAttribute("class", "btn question-button");
        btn.setAttribute("id", "btn-" + index);
        btn.textContent = answer;
        btn.addEventListener("click", event => {
          // Add one to the index to check answer
          if (question[questionCount].answer === index + 1) {
            // Right Answer
            // score++;
            // addScore();
            //Need to reset content for the next button, might combine the changeStartContent() and removeContent into one function
            totalSeconds += 15;
            questionCount++;
            removeContent();
          } else {
            // If wrong answer is selected, remove 15 seconds from total time
            totalSeconds -= 15;
          }
        });
        buttonContainer.appendChild(btn);
      });
    } else if (questionCount === question.length) {
      clearInterval(interval);
      questionContainer.textContent = "You've completed the quiz!";
    }
  }
}

function startTime() {
  var timerArea = document.querySelector("#timer-container");
  var timerElement = document.createElement("p");
  interval = setInterval(function() {
    totalSeconds--;
    timerElement.textContent = "Time remaining: " + totalSeconds;
    // Displays the timer in the timer area
    timerArea.appendChild(timerElement);
    if (totalSeconds <= 0) {
      clearInterval(interval);
      alert("Game Over");
    }
  }, 1000);
}

//Unused at the moment
// function addScore() {
//   questionContainer.textContent = "Your final score is " + score;
// }

startButton.addEventListener("click", startQuiz);
