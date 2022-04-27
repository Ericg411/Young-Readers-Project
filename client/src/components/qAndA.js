import React from "react";
import '../styles/index.css'

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
      let pickedQuestion = Math.floor(Math.random() * quesArr.length)
      return quesArr[pickedQuestion]
  }

  function handleSubmit(event, data) {
    const url = "http://localhost:8000/studentupdate";
    //post body data
    const user = {
      userAnswer: event.target[0].value,
      userAnswer2: event.target[1].value,
      userAnswer3: event.target[2].value,
    };
    //request options
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
    <div id="qAndA">
      <h3>Student QandA</h3>
      <form id="input" action="http://localhost:8000/studentupdate" method="POST">
        <input type="hidden" value={props.answers.date} name="date" />
        <input type="text" name="question1" value={props.answers.question1 || questionPicker()} readOnly/>
        <h4>{props.answers.userAnswer}</h4>
        <textarea
          placeholder="Type your answer here! Click and drag to resize the box."
          type="text"
          id="a1"
          name="userAnswer"
        />
        <input type='text' name="question2" value={props.answers.question2 || questionPicker()} readOnly/>
        <h4>{props.answers.userAnswer2}</h4>
        <textarea
          placeholder="Type your answer here! Click and drag to resize the box."
          type="text"
          id="a2"
          name="userAnswer2"
        />
        <input type="text" name="question3" value={props.answers.question3 || questionPicker()} readOnly/>
        <h4>{props.answers.userAnswer3}</h4>
        <textarea
          placeholder="Type your answer here! Click and drag to resize the box."
          type="text"
          id="a3"
          name="userAnswer3"
        />
        <input type="submit" />
      </form>
    </div>
  );
}
