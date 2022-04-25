import React, { useState } from "react";

function BookSearch(user) {
  const [search, setSearch] = useState({ searchResults: "" });
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearch({searchResults: undefined})
    const { isbn } = event.target.elements;
    let url =
      "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
      isbn.value +
      "&key=" + process.env.REACT_APP_BOOKAPI_KEY;
      console.log(url)
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setSearch({ searchResults: result.items });
        if (search.searchResults !== undefined || search.searchResults !== "") {
          const initialCreate = "http://localhost:8000/create";
          console.log(result.items[0]?.volumeInfo.author)
          const create = {
            userName: user.user,
            bookTitle : result.items[0]?.volumeInfo.title,
            bookAuthor : result.items[0]?.volumeInfo.authors[0]
          }
          const options = {
            method: "POST",
            body: JSON.stringify(create),
            headers: {
              "Content-Type": "application/json",
            }
          };
          fetch(initialCreate, options)
          .then((res) => res.json())
          .then((res) => console.log(res))
          window.location.reload()
        }
      });
    isbn.value = "";
    };
  if (search.searchResults !== undefined) {
    return (
      <div>
        <h2>Before you begin reading a new book, add it here!</h2>
        <hr></hr>
        <form onSubmit={handleSubmit}> 
          <input type="hidden" value={user.user} name="userName" />
          <label htmlFor="isbn">ISBN:</label>
          <input type="number" id="isbn" required />
          <input type="hidden" value={search.searchResults[0]?.volumeInfo.title ?? ""} name="bookTitle" />
          <input type="hidden" value={search.searchResults[0]?.volumeInfo.authors[0] ?? ""} name="bookAuthor" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Before you begin reading a new book, add it here!</h2>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <label htmlFor="isbn">ISBN:</label>
          <input type="number" id="isbn" required />
          <button type="submit">Submit</button>
          <h2>Sorry, that is an invalid ISBN. Please try again!</h2>
        </form>
      </div>
    );
  }
}

export default BookSearch;
