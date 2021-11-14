const express = require("express");
const path = require("path");
const { render } = require("pug");

const port = process.env.PORT || 3000;
let quizNum = 0;
let score;
let questions = [
  "3, 1, 4, 1, 5",
  "1, 1, 2, 3, 5",
  "1, 4, 9, 16, 25",
  "2, 3, 5, 7, 11",
  "1, 2, 4, 8, 16",
];
let answers = [9, 8, 36, 13, 32];
let i;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  i = 0;
  score = 0;
  quizNum++;
  res.render("quiz", {
    question: questions[0],
    score,
    quizNum,
  });
});

app.post("/quiz", (req, res) => {
  while (i < questions.length) {
    if (parseInt(req.body.answer) === answers[i]) {
      score++;
    }
    i++;
    break;
  }
  if (i === questions.length) {
    return res.render("result", {
      score,
      numOfQuestions: questions.length,
    });
  }
  res.render("quiz", {
    score: score,
    quizNum: quizNum,
    question: questions[i],
  });
});
app.listen(port, () => {
  console.log(`Web server listening on port ${port} ...`);
});
