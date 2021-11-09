const WIDTH = 100;
const HEIGHT = 100;
let col = 3;
let row = 3;

let init = function () {
  let divs = $("#puzzlearea > div");

  // initialize each square piece
  for (var i = 0; i < divs.length; i++) {
    var div = divs[i];

    // calculate x and y for each square piece
    var x = (i % 4) * 100;
    var y = Math.floor(i / 4) * 100;

    // set basic style and background
    div.className = "squarePiece";
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.style.backgroundPosition = -x + "px " + -y + "px";

    // store x and y for later
    div.x = x;
    div.y = y;
  }
};

// Check if square piece is movable
let isMovable = function (tile) {
  let freeTileXpos = row * WIDTH;
  let freeTileYpos = col * HEIGHT;

  let clickedTilePosition = tile.position();
  let x = clickedTilePosition.left;
  let y = clickedTilePosition.top;

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
function movePiece(tile) {
  let curTile = tile.position();
  let x = curTile.left;
  let y = curTile.top;

  let tempX = x / 100;
  let tempY = y / 100;

  tile.css({
    top: col * HEIGHT,
    left: row * WIDTH,
  });

  row = tempX;
  col = tempY;
}

// Shuffle tiles
function shuffle() {
  init();

  let originalUnshuffledArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ];
  let shuffledArray = shuffleArray(originalUnshuffledArray);

  $("#puzzlearea > div").each(function (idx) {
    let newIdx = shuffledArray[idx];
    var xPos = function (num) {
      return (num % 4) * 100;
    };
    var yPos = function (num) {
      return Math.floor(num / 4) * 100;
    };
    var x = xPos(newIdx);
    var y = yPos(newIdx);
    var origX = xPos(idx);
    var origY = yPos(idx);
    $(this).addClass("squarePiece");
    $(this).css({
      left: x + "px",
      top: y + "px",
      // "background-image": "url(../img/background.jpg)",
      "background-position": -origX + "px" + -origY + "px",
    });
    $(this).x = x;
    $(this).y = y;
  });
  randomizeEmptyArea(shuffledArray);
}

var shuffleArray = function (arr) {
  let numElements = arr.length;
  let numTimesToShuffle = numElements;

  while (numTimesToShuffle != 0) {
    let randIdx1 = Math.floor(Math.random() * numElements);
    let randIdx2 = Math.floor(Math.random() * numElements);
    let tmp = arr[randIdx1];
    arr[randIdx1] = arr[randIdx2];
    arr[randIdx2] = tmp;
    numTimesToShuffle -= 1;
  }
  return arr;
};

var randomizeEmptyArea = function (arr) {
  let numElements = arr.length;
  let randDivIdx = Math.floor(Math.random() * numElements);
  var randDiv = $("#puzzlearea > div")[randDivIdx];

  let randDivX = $(randDiv).position().left;
  let randDivY = $(randDiv).position().top;
  $(randDiv).css({
    top: col * HEIGHT,
    left: row * WIDTH,
  });
  row = randDivX / 100;
  col = randDivY / 100;
};

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
