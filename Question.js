//import mongoose
const mongoose = require("mongoose");

// //create a schema for the expected data structure
const QuestionSchema = new mongoose.Schema({
  userName: String,
  bookTitle: String,
  bookAuthor: String,
  userAnswer: String,
  userAnswer2: String,
  userAnswer3: String,
  date: String,
  teacherAnswer: String,
  teacherAnswer1: String,
  teacherAnswer2: String,
  teacherAnswer3: String
});

module.exports = QuestionSchema;
