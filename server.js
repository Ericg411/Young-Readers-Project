//import what will be required
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
//import Schema
const QuestionSchema = require("./Question.js");

//create initial connection to database
mongoose.connect(
  "mongodb://localhost:27017/youngreaders",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded!");
    } else {
      console.log(`Error in DB connection: ${err}`);
    }
  }
);

//initialize a database through a connection constructor and store in a variable
const db = mongoose.connection;

//set up port 5000
const port = process.env.PORT || 5000;

//store the calling of express in a variable
const app = express();

//bring in error handling for database connection
db.on("error", console.error.bind(console, "connection error"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//create a model for the database entries
const Question = mongoose.model("questions", QuestionSchema);

//set app to listen
app.listen(port, () => {
  console.log(`Coming at ya live, on WKNLOCALHOST:${port}, THE BUG!`);
});

//api routes
app.get("/", async (req, res) => {
  let allQuestions = await Question.find({});
  res.json(allQuestions);
});

//create functionality
app.post("/create", async (req, res) => {
  const newQuestion = new Question({
    // userName: req.body.userName,
    userAnswer: req.body.userAnswer,
    userAnswer2: req.body.userAnswer2,
    userAnswer3: req.body.userAnswer3,
    date: Date(),
  });

  await newQuestion.save();

  res.redirect("http://localhost:3000/");
});

//update functionality for teacher page
app.post("/update", async (req, res) => {
  let allQuestions = Question.find({});
  allQuestions.updateOne(
    { "_id": "6256ebf6b1acee7314c00de5" },
    { $addFields: { "teacherResponse": "GOOD JOB ON THIS ONE, SAMBUBU" } }
    );
    console.log("AAAA YOU DID IT YOU DID IT");
    res.redirect("http://localhost:3000/");
});
