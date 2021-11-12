const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.get("/calculate.js", (req, res) => {
  let operation = req.query.calculate;
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);
  let result;

  if (isNaN(num1) || isNaN(num2)) {
    return res.redirect("/");
  } else if (operation === "add") {
    result = num1 + num2;
  } else if (operation === "subtract") {
    result = num1 - num2;
  } else if (operation === "multiply") {
    result = num1 * num2;
  } else if (operation === "divide") {
    result = num1 / num2;
  } else {
    return res.redirect("/");
  }
  res.send(
    `The Answer is: ${result} <br/><br/>
    <div><a href="${req.protocol}://${req.hostname}:${port}">Another calculation</div>`
  );
});

app.get("/*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
