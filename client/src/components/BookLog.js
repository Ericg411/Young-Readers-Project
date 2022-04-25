import React, { useEffect, useState } from "react";
import BookModal from "./BookModal";


export default function BookLog (props) {
  const [modalState, setModalState] = useState(false);
  const [bookLog] = useState([]);


  function handleClick(question) {
    if (modalState === true) {
      setModalState(false);
  }

  function fetcher() {
    fetch(`http://localhost:8000/students/${props.user}`)
      .then((res) => {
        return res.json();
      })
  }


  function handleSubmit(event, data) {
    const url = "http://localhost:8000/update";
    const user = {
      bookLog: data,
    };
   
    const options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  return (
    <div id="bookLog-Main">
      <h4 id="title">Book Log Page</h4>
      {bookLog.map((bookLog) => {
        return (
          <div id="bookLog" key={question._id}>
            <button id="submitButton" onClick={() => handleClick(question)}>
              <p id="userName">{question.userName}</p>
              <p id="bookTitle">{question.bookTitle}</p>
              <p id="bookAuthor">{question.bookAuthor}</p>
            </button>
          </div>
        );
      })}
      <BookModal
        state={modalState}
        click={handleClick}
        submit={handleSubmit}
      />
    </div> 
  ); }}
