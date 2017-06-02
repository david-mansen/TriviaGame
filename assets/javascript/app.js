$(document).ready(function(){

  var questions = [
    {
      question: "What is 1+1",
      answers: ["1","2","3","QUITWHILEYOUCAN"],
      correct: "2",
    },
    {
      question: "What is 4*4",
      answers: ["9999","16","1","UNDEFINED"],
      correct: "16",
    },
    {
      question: "What is the color of night?",
      answers: ["7","squirrel","This isn't a math question","infinity"],
      correct: "This isn't a math question",
    },
    {
      question: "What is my name, human?",
      answers: ["Programs aren't people!","Master","Master","Master"],
      correct: "Master",
    }
  ];

  var numCorrect = 0;
  var numWrong = 0;
  var numNoResponse = 0;
  var timeRemaining = 5;
  var currentQuestion = 0;

  function resetGame(){
    shuffleArray(questions);
    currentQuestion = 0;
    numCorrect = 0;
    numWrong = 0;
    numNoResponse = 0;
    timeRemaining = 5;
    $("#end").slideUp(1000);
    nextQuestion();
  }

  function shuffleArray(array){
    array.sort(function(){
      return .5 - Math.random();
    });
  }

  function showResult(result){
    var response;
    var correctResponse;
    if(result === "true"){
      response = "Lucky guess...";
      correctResponse = "";
    }
    else if(result === "false"){
      response = "Failure!!!";
      correctResponse = "The answer was "+questions[currentQuestion].correct;
    }
    else{
      response = "Too afraid to answer?";
      correctResponse = "The answer was "+questions[currentQuestion].correct;
    }
    $("#responseHeader").text(response);
    $("#correctResponseHeader").text(correctResponse);

    $("#question").slideUp(1000);
    $("#answer").slideDown(1000);

    setTimeout(function(){
      currentQuestion++;
      if(currentQuestion >= questions.length){
        endGame();
      }
      else{
        nextQuestion();
      }
    },3000);
  }

  function nextQuestion(){
    timeRemaining = 5;
    $("#timeRemainingSpan").text(timeRemaining);
    var q = questions[currentQuestion];
    shuffleArray(q.answers);

    $("#questionHeader").text(q.question);
    $("#questionHeader").attr("correct",q.correct);

    $("#button0").text(q.answers[0]);
    $("#button1").text(q.answers[1]);
    $("#button2").text(q.answers[2]);
    $("#button3").text(q.answers[3]);

    timer = setInterval(timeTick, 1000);

    $("#answer").slideUp(1000);
    $("#question").slideDown(1000);
  }

  function endGame(){
    $("#numCorrectHeader").text("Lucky Guesses: "+numCorrect);
    $("#numWrongHeader").text("Failures: "+numWrong);
    $("#numNoResponseHeader").text("Instances of Cowardice: "+numNoResponse);
    $("#answer").slideUp(1000);
    $("#end").slideDown(1000);
  }


  function timeTick(){
    timeRemaining--;
    if(timeRemaining < 0){
      numNoResponse++;
      showResult("noResponse");
      clearInterval(timer);
    }
    else{
      $("#timeRemainingSpan").text(timeRemaining);
    }
  }

  $("#startButtonInner").on("click", function(){
    var q = questions[currentQuestion];
    shuffleArray(q.answers);

    $("#questionHeader").text(q.question);
    $("#questionHeader").attr("correct",q.correct);

    $("#button0").text(q.answers[0]);
    $("#button1").text(q.answers[1]);
    $("#button2").text(q.answers[2]);
    $("#button3").text(q.answers[3]);

    timer = setInterval(timeTick, 1000);

    $("#start").slideUp(1000);
    $("#timeRemainingDiv").slideDown(1000);
    $("#question").slideDown(1000);
  });

  $(".answer-button").on("click", function(){
    var answer = $("#questionHeader").attr("correct");
    var choice = $(this).text();
    clearInterval(timer);
    if (answer === choice){
      numCorrect++;
      showResult("true");
    }
    else{
      numWrong++;
      showResult("false");
    }
  });



  var timer;
  $("#resetButtonInner").on("click", resetGame);


});
