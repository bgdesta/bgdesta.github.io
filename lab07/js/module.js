"use strict";

(function () {
  window.onload = function () {
    document.getElementById("clickBtn").onclick = rudyTimer;
  };

  let rudyTimer = (function () {
    let timer = null;
    return function () {
      if (timer === null) {
        timer = setInterval(rudy, 1000);
      } else {
        clearInterval(timer);
        timer = null;
      }
    };
  })();

  function rudy() {
    document.getElementById("output").innerHTML += "Rudy!";
  }
})();
