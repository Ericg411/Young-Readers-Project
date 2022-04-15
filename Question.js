//import mongoose
const mongoose = require("mongoose");

// //create a schema for the expected data structure
const QuestionSchema = new mongoose.Schema({
  // userName: String,
  userAnswer: String,
  userAnswer2: String,
  userAnswer3: String,
  date: Date,
});

module.exports = QuestionSchema;
