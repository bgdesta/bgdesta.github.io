window.onload = function () {
  document.getElementById("decorator").onclick = btnClickHandler;
  document.getElementById("bling").onclick = blingHandler;
  document.getElementById("igpay").onclick = igpayAtinlay;
  document.getElementById("malkovitch").onclick = applyMalkovitch;
};

function btnClickHandler() {
  window.setInterval(increaseFontBy2, 500);
}

function increaseFontBy2() {
  let computedFontSize = parseInt(
    window.getComputedStyle(document.getElementById("sampleText")).fontSize
  );

  let addTwo = computedFontSize + 2;
  document.getElementById("sampleText").style.fontSize = addTwo + "pt";
}

function blingHandler() {
  let isChecked = document.getElementById("bling").checked;
  let decorateArea = document.getElementById("sampleText");
  let page = document.querySelector("body")[0];

  if (isChecked) {
    decorateArea.style.fontWeight = "bold";
    decorateArea.style.color = "green";
    decorateArea.style.textDecoration = "underline";
    document.body.style.backgroundImage =
      "url('https://courses.cs.washington.edu/courses/cse190m/CurrentQtr/labs/6/hundred-dollar-bill.jpg')";
  } else {
    decorateArea.style.fontWeight = "normal";
    decorateArea.style.color = "black";
    decorateArea.style.textDecoration = "none";
    document.body.style.backgroundImage = "";
  }
}

function applyMalkovitch() {
  let textData = document.getElementById("sampleText").value.split(" ");
  let converted = [];
  for (let i = 0; i < textData.length; i++) {
    if (textData[i].length >= 5) {
      converted.push("Malkovich");
    } else {
      converted.push(textData[i]);
    }
  }
  document.getElementById("sampleText").value = converted.join(" ");
}

function igpayAtinlay() {
  let textData = document.getElementById("sampleText").value.split(" ");
  let output = [];
  let vowelRegx = "^[aeiouAEIOU].*";
  let newText;

  for (let i = 0; i < textData.length; i++) {
    if (textData[i].match(vowelRegx)) {
      newText = textData[i] + "ay";
      output.push(newText);
    } else {
      newText = textData[i].substring(1) + textData[i][0];
      while (!newText.match(vowelRegx)) {
        newText = newText.substring(1) + newText[0];
      }
      output.push(newText + "ay");
    }
  }
  document.getElementById("sampleText").value = output.join(" ");
}
