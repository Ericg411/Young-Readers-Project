import React, { Component } from "react";
import Header from "./Header";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar.js";
import BookList from "./BookList";
import request from "superagent";

class Books extends Component {
  constructor (props) {
  super (props);  
  this.state = {
    books: [],
    searchField: "",
    sort: "",
  }
}

  searchBook = (e) => {
    e.preventDefault();
    request
      .get("https://www.googleapis.com/books/v1/volumes?q=isbn&key=AIzaSyC-0s2XXV8Rqtq55oCXd9PfcMpn0kZ68RA")
      .query({ q: SearchBar })
      .then((data) => {
        const cleanData = this.cleanData(data);
        this.setState({ books: cleanData });
      });
  };

  handleSearch = (e) => {
    console.log(e.target.value);
    this.setState({ searchBar: e.target.value });
  };

 handleSort = (e) => {
    this.setState({ sort: e.target.value });
  };

cleanData = (data) => {
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

  render () {
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
        <SearchBar searchBook={this.searchBook} handleSort={this.handleSort}/>
        <BookList books={this.state.sortedBooks} />
      </div>
    );
  };
};

export default Books;
