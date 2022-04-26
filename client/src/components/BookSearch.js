import React, { useState } from "react";
import "./styles/index.css";

function BookSearch() {
  const [search, setSearch] = useState({ searchResults: ""});
  console.log(search)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { isbn } = event.target.elements;

    let url =
      "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
      isbn.value +
      "&key=AIzaSyAJsd4HV0TTDwY5R5239XL99bKLdiZWxcw";
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setSearch({ searchResults: result.items });
        console.log(result.items[0].volumeInfo.title);
        console.log(result.items[0].volumeInfo.authors[0]);
      });
      isbn.value = ""
  };
  return (
    <div>
        <h2>Before you begin reading a new book, add it here!</h2>
        <hr></hr>
      <form onSubmit={handleSubmit}>
        <label htmlFor="isbn">ISBN:</label>
        <input type="number" id="isbn" required />
        <button type="submit">Submit</button>
        <h2> Title: {search.searchResults[0]?.volumeInfo.title}</h2>
        <h2> Author: {search.searchResults[0]?.volumeInfo.authors[0]}</h2>
      </form>
    </div>
  );
}

export default BookSearch;
