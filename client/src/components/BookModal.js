import React from "react";
import "./styles/index.css";

export default function BookModal(props) {
  if (props.state === true) {
    let question = props.selectedBook;
    return (
      <div id="book-modal">
        <form
          id="book-modal-form"
        >
          <h3 id="userName">Submitted by: {question.userName}</h3>
          <p id="date">On: {question.date}</p>
          <h4>Book Title:</h4>
          <p id="bookTitle">{question.bookTitle}</p>
          <h4>Book Author</h4>
          <p id="bookAuthor">{question.bookAuthor}</p>
          <button id="closeWindow" onClick={props.click}>
            Close Window
          </button>
        </form>
      </div>
    );
  } else {
    return <div style={{ display: "none" }}></div>;
  }
}
