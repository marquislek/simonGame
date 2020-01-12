var gameStart = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  colorFlash(buttonColours[randomNumber]);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

function colorFlash(color) {
  $("#" + color)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  last = level - 1;
  return gamePattern[last] == userClickedPattern[last];
}

function wrongReset() {
  if (gameStart == true) {
    $("#level-title").text("WRONG! press a button to try again");
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").css("background-color", "red");
    setTimeout(function() {
      $("body").css("background-color", "#011F3F");
    }, 200);
    gameStart = false;
  }
}

$(".btn").click(function() {
  if (gameStart) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    if (checkAnswer()) {
      setTimeout(function() {
        nextSequence();
      }, 350);
    } else {
      wrongReset();
    }
    animatePress(userChosenColour);
    playSound(userChosenColour);
  }
});

$(document).on("keydown", function() {
  if (gameStart == false) {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStart = true;
    nextSequence();
  }
});
