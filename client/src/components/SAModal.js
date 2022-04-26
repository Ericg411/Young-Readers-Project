import React from "react";
import '../styles/index.css'
import QandA from './qAndA'

export default function SAModal(props) {
  if (props.state === true) {
    let answers = props.selectedQA;
    return (
      <div id="tamodal">
          <h3 id="userName">Submitted by: {answers.userName}</h3>
          <p id="date">On: {answers.date}</p>
          <QandA title={answers.bookTitle}/>
        <form
          id="tamodal-form"
        >
          {/* <h3>Book Title:</h3>
          <p id="bookTitle">{answers.bookTitle}</p>
          <h3>Placeholder Question One?:</h3>
          <p id="userAnswer">{answers.userAnswer}</p>
          <h3>Placeholder Question Two?:</h3>
          <p id="userAnswer2">{answers.userAnswer2}</p>
          <h3>Placeholder Question Three?: </h3>
          <p id="userAnswer3">{answers.userAnswer3}</p> */}
          <h3>Teacher's Response:</h3>
          <p>Question One: {answers.teacherAnswer1}</p>
          <p>Question Two: {answers.teacherAnswer2}</p>
          <p>Question Three:{answers.teacherAnswer3}</p>
          <p>Overall: {answers.teacherAnswer}</p>
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
