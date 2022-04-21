import React, { useState } from "react";
import Header from "./Header";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar.js";
import BookList from "./BookList";
import request from "superagent";

const Books = (props) => {
  let [state, setState] = useState({
    books: [],
    searchField: "",
    sort: "",
  });

  const searchBook = (e) => {
    e.preventDefault();
    request
      .get("https://www.googleapis.com/books/v1/volumes?q=isbn&key=AIzaSyC-0s2XXV8Rqtq55oCXd9PfcMpn0kZ68RA")
      .query({ q: SearchBar })
      .then((data) => {
        console.log(data);
        const cleanData = this.cleanData(data);
        setState({ books: cleanData });
      });
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    setState({ searchBar: e.target.value });
  };

  const handleSort = (e) => {
    this.setState({ sort: e.target.value });
  };

  const cleanData = (data) => {
    const cleanedData = data.body.items.map((book) => {
      if (book.volumeInfo.hasOwnProperty("publishedDate") === false) {
        book.volumeInfo["publishedDate"] = "0000";
      } else if (book.volumeInfo.hasOwnProperty("imageLinks") === false) {
        book.volumeInfo["imageLinks"] = {
          thumbnail:
            "https://images.all-free-download.com/images/graphicwebp/book_cover_design_birds_and_trees_decoration_6826952.webp",
        };
      }

      return book;
    });

    return cleanedData;
  };

  return () => {
    const sortedBooks = this.state.books.sort((a, b) => {
      if (this.state.sort === "Newest") {
        return parseInt(
          b.volumeInfo.publishedDate.substring(0, 4) -
            parseInt(a.volumeInfo.publishedDate)
        );
      } else if (this.state.sort === "Oldest") {
        return parseInt(
          a.volumeInfo.publishedDate.substring(0, 4) -
            parseInt(b.volumeInfo.publishedDate)
        );
      }
    });

    return (
      <div>
        <SearchBar searchBook={searchBook} handleSort={handleSort}/>
        <BookList books={sortedBooks} />
      </div>
    );
  };
};

export default Books;
