"use strict";

(function () {
  var animation = null;

  var btnStop;
  var btnStart;
  var fontSize;
  var animationType;
  var txtDisplayArea;
  var chkSpeed;

  var currentFrame;

  var delay = 250;
  var timer = null;
  var index = 0;

  function startAnimation() {
    toogleControl("start");
    currentFrame = txtDisplayArea.value;
    if (timer === null) {
      timer = setInterval(changeFrame, delay);
    }
  }

  function stopAnimation() {
    toogleControl("stop");

    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }

    index = 0;
    restoreFrame();
  }

  function changeAnimationText() {
    var selected = animationType.options[animationType.selectedIndex].value;
    if (selected == "Custom")
      ANIMATIONS[selected] =
        "(•_•)\n" +
        "=====\n" +
        "(•_•)\n" +
        "=====\n" +
        "(•_•)\n" +
        "=====\n" +
        "(•_•)\n" +
        "=====\n" +
        "( •_•)\n" +
        "=====\n" +
        "Asciimation\n" +
        "( •_•)\n" +
        "=====\n" +
        "imation\n" +
        "( •_•)>\n" +
        "=====\n" +
        "ion\n" +
        "( •_•)>\n" +
        "=====\n" +
        "( •_•)>⌐■-■\n" +
        "=====\n" +
        "( •_•)⌐■-■\n" +
        "=====\n" +
        "( •_•⌐■-■\n" +
        "=====\n" +
        "Completed\n" +
        "( •_⌐■-■\n" +
        "=====\n" +
        "leted\n" +
        "( •⌐■-■\n" +
        "=====\n" +
        "d\n" +
        "( ⌐■-■\n" +
        "=====\n";

    animation = ANIMATIONS[selected];

    txtDisplayArea.value = animation;
  }

  function changeFontSize() {
    txtDisplayArea.style.fontSize =
      fontSize.options[fontSize.selectedIndex].value;
  }

  function changeDelay() {
    if (chkSpeed.checked) {
      delay = 50;
      clearInterval(timer);
      timer = setInterval(changeFrame, delay);
    } else {
      delay = 250;
      clearInterval(timer);
      timer = setInterval(changeFrame, delay);
    }
  }

  function toogleControl(state) {
    if (state === "start") {
      btnStart.disabled = true;
      btnStop.disabled = false;
      animationType.disabled = true;
    } else if (state === "stop") {
      btnStart.disabled = false;
      btnStop.disabled = true;
      animationType.disabled = false;
    }
  }

  function changeFrame() {
    var frames = currentFrame.split("=====\n");
    txtDisplayArea.value = frames[index];
    index++;

    if (index === frames.length) index = 0;
  }

  function restoreFrame() {
    txtDisplayArea.value = currentFrame;
  }

  window.onload = function () {
    txtDisplayArea = document.getElementById("displayarea");

    btnStart = document.getElementById("start");
    btnStart.onclick = startAnimation;

    btnStop = document.getElementById("stop");
    btnStop.onclick = stopAnimation;

    animationType = document.getElementById("animation");
    animationType.onchange = changeAnimationText;
    animationType.selectedIndex = 0;

    fontSize = document.getElementById("selectedSize");
    fontSize.onchange = changeFontSize;
    fontSize.selectedIndex = 2;

    chkSpeed = document.getElementById("speed");
    chkSpeed.onchange = changeDelay;
  };
})();
