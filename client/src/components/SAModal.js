import React from "react";
import "../styles/TAModal.css";

export default function SAModal(props) {
  if (props.state === true) {
    let answers = props.selectedQA;
    return (
      <div id="tamodal">
        <form
          id="tamodal-form"
        >
          <h3 id="userName">Submitted by: {answers.userName}</h3>
          <p id="date">On: {answers.date}</p>
          <h4>Book Title:</h4>
          <p id="bookTitle">{answers.bookTitle}</p>
          <h4>Question One Response:</h4>
          <p id="userAnswer">{answers.userAnswer}</p>
          <h4>Question Two Response:</h4>
          <p id="userAnswer2">{answers.userAnswer2}</p>
          <h4>Question Three Response</h4>
          <p id="userAnswer3">{answers.userAnswer3}</p>
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
