import React, { useState, useRef, useEffect } from "react";
import "../styles/index.css";

export default function QandA(props) {
  let quesArr = [
    "What's the Big Idea?",
    "What happened in the story?",
    "What was wrong with the main character?",
    "Why did the villian decide to do that?",
    "Who was that weirdo on page 256?",
    "What was your favorite part?",
  ];
  function questionPicker() {
    let pickedQuestion = Math.floor(Math.random() * quesArr.length);
    return quesArr.splice(pickedQuestion, 1);
  }
  function questionPicker2() {
    let pickedQuestion = Math.floor(Math.random() * quesArr.length);
    return quesArr.splice(pickedQuestion, 1);
  }
  function questionPicker3() {
    let pickedQuestion = Math.floor(Math.random() * quesArr.length);
    return quesArr.splice(pickedQuestion, 1);
  }

  let [showText, setShowText] = useState(true);
  
  
      const elRef = useRef()

      useEffect(() => {
          console.log(elRef.current.textContent)
          if (elRef.current.textContent !== "") {
              setShowText(!showText)
          }
      }, []);
  
  return (
    <div id="qAndA">
      <h3>Student QandA</h3>
      <form
        id="input"
        action="http://localhost:8000/studentupdate"
        method="POST"
      >
        <input type="hidden" value={props.answers.date} name="date" />
        <input
          type="text"
          name="question1"
          value={props.answers.question1 || questionPicker()}
          readOnly
        />
        <h4>{props.answers.userAnswer}</h4>
        {showText && (
          <textarea
            placeholder="Type your answer here! Click and drag to resize the box."
            type="text"
            id="a1"
            name="userAnswer"
            required
          />
        )}
        <input
          type="text"
          name="question2"
          value={props.answers.question2 || questionPicker2()}
          readOnly
        />
        <h4>{props.answers.userAnswer2}</h4>
        {showText && (
          <textarea
            placeholder="Type your answer here! Click and drag to resize the box."
            type="text"
            id="a2"
            name="userAnswer2"
            required
          />
        )}
        <input
          type="text"
          name="question3"
          value={props.answers.question3 || questionPicker3()}
          readOnly
        />
        <h4 ref={elRef}>{props.answers.userAnswer3}</h4>
        {showText && (
          <textarea
            placeholder="Type your answer here! Click and drag to resize the box."
            type="text"
            id="a3"
            name="userAnswer3"
            required
          />
        )}
        {showText && <input type="submit"/>}
      </form>
    </div>
  );
}