const WIDTH = 100;
const HEIGHT = 100;
let rowVal = 3;
let colVal = 3;

let init = function () {
  $("#puzzlearea > div").each(function (index) {
    // Calculate x and y for each square piece
    let x = (index % 4) * 100;
    let y = Math.floor(index / 4) * 100;

    //Set Basic style and background
    $(this).addClass("squarePiece");
    $(this).attr("id", x + "_" + y);
    $(this).css({
      left: x + "px",
      top: y + "px",
      // "background-image": 'url("background.jpg")',
      "background-position": -x + "px " + -y + "px",
    });

    // store x and y for later
    this.x = x;
    this.y = y;
  });
};

//Check if square piece is movable
let isMovable = function ($tile) {
  console.log($tile.position());
  let freeTileXpos = rowVal * WIDTH;
  let freeTileYpos = colVal * HEIGHT;

  let x = $tile.position().left;
  let y = $tile.position().top;

  // movable position left right top bottom
  let leftTilePos = x + 100;
  let topTilePos = y - 100;
  let rightTilePos = x - 100;
  let bottomTilePos = y + 100;

  let leftTilePosCHECK =
    leftTilePos == freeTileXpos && y == freeTileYpos ? true : false;
  var rightTilePosCHECK =
    rightTilePos == freeTileXpos && y == freeTileYpos ? true : false;
  var topPOSCHECK =
    topTilePos == freeTileYpos && x == freeTileXpos ? true : false;
  var bottomTilePosCHECK =
    bottomTilePos == freeTileYpos && x == freeTileXpos ? true : false;

  if (
    leftTilePosCHECK ||
    rightTilePosCHECK ||
    topPOSCHECK ||
    bottomTilePosCHECK
  ) {
    return true;
  } else {
    return false;
  }
};

// move squarePiece (tile)
function movePiece($tile) {
  let x = $tile.position().left;
  let y = $tile.position().top;

  let tempX = x / 100;
  let tempY = y / 100;

  $tile.css({
    top: colVal * HEIGHT,
    left: rowVal * WIDTH,
  });

  rowVal = tempX;
  colVal = tempY;

  //check whether you won the puzzel or not
  let col = 0;
  let row = 0;
  $(".puzzlepiece").each(function () {
    if ($(this).attr("id") === row * 100 + "_" + col * 100) {
      row++;
      if (row === 4) {
        row = 0;
        col++;
      }
    }
  });
  if (row === 3 && col === 3) {
    let confirmation = confirm(
      "Congratulations, You won the Game! \n Press ok to continue ..."
    );
    if (confirmation === true) {
      shuffle();
    }
  }
}

// Shuffle square pieces to start playing the game
function shuffle() {
  for (var i = 0; i < 100; i++) {
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    if (row !== rowVal || col !== colVal) {
      let $selectedSqr = $("#" + row * 100 + "_" + col * 100);
      if ($selectedSqr.length !== 0 && isMovable($selectedSqr)) {
        $selectedSqr.triggerHandler("click");
      }
    }
  }
}

// Check if page has fully loaded
$(document).ready(function () {
  init();
  $(".squarePiece").hover(
    function () {
      if (isMovable($(this))) {
        $(this).css({
          color: "red",
          borderColor: "red",
        });
      }
    },
    function () {
      $(this).css({
        borderColor: "black",
        color: "black",
      });
    }
  );

  $(".squarePiece").click(function () {
    let isTileMovable = isMovable($(this));
    if (isTileMovable) {
      movePiece($(this));
    }
  });

  $("#shufflebutton").click(shuffle);
});
