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

// let init = function () {
//   let divs = $("#puzzlearea > div");

//   // initialize each square piece
//   for (var i = 0; i < divs.length; i++) {
//     var div = divs[i];

//     // calculate x and y for each square piece
//     var x = (i % 4) * 100;
//     var y = Math.floor(i / 4) * 100;

//     // set basic style and background
//     div.className = "squarePiece";
//     div.style.left = x + "px";
//     div.style.top = y + "px";
//     div.style.backgroundPosition = -x + "px " + -y + "px";

//     // store x and y for later
//     div.x = x;
//     div.y = y;
//   }
// };

//-------------------------------------------------------------------------
function isMovable(x, y) {
  if (rowVal === x && colVal === y - 100) {
    //top
    return true;
  } else if (rowVal === x && colVal === y + 100) {
    //bottom
    return true;
  } else if (rowVal === x - 100 && colVal === y) {
    //left
    return true;
  } else if (rowVal === x + 100 && colVal === y) {
    //right
    return true;
  } else {
    return false;
  }
}
//-------------------------------------------------------------------------
// Check if square piece is movable
// let isMovable = function (tile) {
//   console.log(tile);
//   let freeTileXpos = rowVal * WIDTH;
//   let freeTileYpos = colVal * HEIGHT;

//   let clickedTilePosition = tile.position();
//   let x = clickedTilePosition.left;
//   let y = clickedTilePosition.top;

//   // movable position left right top bottom
//   let leftTilePos = x + 100;
//   let topTilePos = y - 100;
//   let rightTilePos = x - 100;
//   let bottomTilePos = y + 100;

//   let leftTilePosCHECK =
//     leftTilePos == freeTileXpos && y == freeTileYpos ? true : false;
//   var rightTilePosCHECK =
//     rightTilePos == freeTileXpos && y == freeTileYpos ? true : false;
//   var topPOSCHECK =
//     topTilePos == freeTileYpos && x == freeTileXpos ? true : false;
//   var bottomTilePosCHECK =
//     bottomTilePos == freeTileYpos && x == freeTileXpos ? true : false;

//   if (
//     leftTilePosCHECK ||
//     rightTilePosCHECK ||
//     topPOSCHECK ||
//     bottomTilePosCHECK
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// };

// move squarePiece (tile)
function movePiece(tile) {
  let curTile = tile.position();
  let x = curTile.left;
  let y = curTile.top;

  let tempX = x / 100;
  let tempY = y / 100;

  tile.css({
    top: colVal * HEIGHT,
    left: rowVal * WIDTH,
  });

  rowVal = tempX;
  colVal = tempY;
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
  rowVal = randDivX / 100;
  colVal = randDivY / 100;
};

function sheffel() {
  for (var i = 0; i < 100; i++) {
    let row = Math.floor((Math.random() * 4) % 4);
    let col = Math.floor((Math.random() * 4) % 4);
    // if (row !== rowVal / 100 || col !== colVal / 100) {
    if (row !== rowVal / 100 || col !== colVal / 100) {
      let selected = $("#" + row * 100 + "_" + col * 100);
      console.log("selected: " + selected.innerHTML);
      //alert(selected[0].x);
      if (isMovable(selected[0].x, selected[0].y)) {
        // if (isMovable(selected[i])) {
        selected.triggerHandler("click");
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

  // $("#shufflebutton").click(shuffle);
  $("#shufflebutton").click(sheffel);
});
