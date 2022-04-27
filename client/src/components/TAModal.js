import React, { useState, useRef, useEffect } from "react";
import "../styles/index.css";

export default function TAModal(props) {
  let [showText, setShowText] = useState(true)

  // const elRef = useRef()

  // useEffect(() => {
  //   console.log(elRef)
  //   if (elRef.current === null) {
  //     setShowText(!showText)
  // }}, [])

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
          <p id="userAnswer">{answers.question1}: {answers.userAnswer}</p>
          <textarea
            id="textInput"
            name="teacherAnswer1"
            placeholder="Type your response here! Click and drag to resize this box."
            required
          />
          <p id="userAnswer2">{answers.question2}: {answers.userAnswer2}</p>
          <textarea
            id="textInput"
            name="teacherAnswer2"
            placeholder="Type your response here! Click and drag to resize this box."
            required
          />
          <p id="userAnswer3">{answers.question3}: {answers.userAnswer3}</p>
          <textarea
            id="textInput"
            name="teacherAnswer3"
            placeholder="Type your response here! Click and drag to resize this box."
            required
          />
          <h2>Overall Response:</h2>
          <textarea
            id="textInput"
            type="text"
            name="teacherAnswer"
            placeholder="This is you overall answer. Type your response here! Click and drag to resize this box."
            required
          />
          <h3>Teacher's Response:</h3>
          <p>{answers.question1 || "Not Done Yet!"}: {answers.teacherAnswer1}</p>
          <p>{answers.question2 || "Not Done Yet!"}: {answers.teacherAnswer2}</p>
          <p>{answers.question3 || "Not Done Yet!"}:{answers.teacherAnswer3}</p>
          <p>Overall:</p>
          <p>{answers.teacherAnswer}</p>
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