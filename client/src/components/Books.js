import React, { useState } from "react";
import SearchBar from "./SearchBar";
import request from "superagent";

const Books = (props) => {
  let [state, setState] = useState({
    books: [],
    searchField: "",
  });

  const searchBook = () => {
    e.preventDefault();
    request
      .get("https://www.googleapis.com/books/v1/volumes?q=search+terms")
      .query({ q: SearchBar })
      .then((data) => {
        console.log(data);
        setState({ books: [...data.body.items] });
      });
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    setState({ searchBar: e.target.value });
  };

    return (
      <div>
        <SearchBar searchBook={searchBook} />
      </div>
    );
  }


export default Books;