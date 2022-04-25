const mongoose = require("mongoose");

// //create a schema for the expected data structure
const BookLogSchema = new mongoose.Schema({
  userName: String,
  bookTitle: String,
  bookAuthor: String,
  bookReview: String
});

module.exports = BookLogSchema;
