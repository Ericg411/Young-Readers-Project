import React from "react";
import "../styles/index.css";

export default function TAModal(props) {
  if (props.state === true) {
    let answers = props.selectedQA;
    return (
      <div id="tamodal">
        <form
          id="tamodal-form"
          onSubmit={(event) => {
            props.submit(event, props.selectedQA.userAnswer);
          }}
        >
          <h3 id="userName">Submitted by: {answers.userName}</h3>
          <p id="date">On: {answers.date}</p>
          <p id="bookTitle">Book Title: {answers.bookTitle}</p>
          <p id="userAnswer">What is Placeholder Question One?: {answers.userAnswer}</p>
          <textarea
            id="textInput"
            name="teacherAnswer1"
            placeholder="Type your response here! Click and drag to resize this box."
          />
          <p id="userAnswer2">What is Placeholder Question Two?: {answers.userAnswer2}</p>
          <textarea
            id="textInput"
            name="teacherAnswer2"
            placeholder="Type your response here! Click and drag to resize this box."
          />
          <p id="userAnswer3">What is Placeholder Question Three?: {answers.userAnswer3}</p>
          <textarea
            id="textInput"
            name="teacherAnswer3"
            placeholder="Type your response here! Click and drag to resize this box."
          />
          <textarea
            id="textInput"
            type="text"
            name="teacherAnswer"
            placeholder="This is you overall answer. Type your response here! Click and drag to resize this box."
          />
          <h3>Teacher's Response:</h3>
          <p>Question One: {answers.teacherAnswer1}</p>
          <p>Question Two: {answers.teacherAnswer2}</p>
          <p>Question Three:{answers.teacherAnswer3}</p>
          <p>Overall: {answers.teacherAnswer}</p>
          <input id="submit" type="submit" />
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
