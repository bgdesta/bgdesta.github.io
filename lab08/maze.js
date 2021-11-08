let win;
let gameStarted;
$(document).ready(function () {
  $("#maze .boundary").off();
  $("#end").off();
  $("#start").off();

  $("#start").click(resetGame);
  $("#end").on("mouseover", endGame);
});

function resetGame() {
  win = true;
  gameStarted = true;
  $("#status").text("Game Started!").css("color", "green");
  $(".boundary").removeClass("youlose");

  $("#maze .boundary").on("mouseover", turnRed);
  $("#end").on("mouseover", endGame);
}

function endGame() {
  let winStatus =
    win === true && gameStarted ? "You won! :)" : "Sorry, you lost! :(";
  $("#status").text(winStatus);
  if (win && gameStarted) {
    $("#status").css("color", "green");
  } else {
    $("#status").text(winStatus);
    $("#status").css("color", "red");
    setTimeout(function () {
      $("#status").text('Click the "S" to begin.');
      $("#status").css("color", "black");
    }, 1000);
  }
  $("#maze .boundary").off();
}
function turnRed() {
  win = false;
  $("#status").text("You lost! :(").css("color", "red");
  $(".boundary").addClass("youlose");
}
