import React, { useEffect, useState } from "react";
import TAModal from "./TAModal";
import '../styles/TAnswer.css'

export default function TeacherAnswer() {
  const [modalState, setModalState] = useState(false);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [selectedQA, setSelectedQA] = useState("");

  function handleClick(questionID) {
    if (modalState === true) {
      setModalState(false);
    } else {
      setSelectedQA(questionID);
      setModalState(true);
    }
  }

  function fetcher() {
    fetch(`http://localhost:8000/`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setStudentAnswers(json);
      });
  }

  useEffect(() => {
    fetcher();
  }, []);

  function handleSubmit(event, data) {
    console.log(data);
    console.log(event.target[0].value);
    const url = "http://localhost:8000/update";
    //post body data
    const user = {
      userAnswer: data,
      teacherAnswer: event.target[0].value,
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
    <div id="studentAnswersMain">
      <h4 id="title">Teacher Response Page</h4>
      {studentAnswers.map((question) => {
        return (
          <div id="studentAnswers" key={question._id}>
            {/* <form
              onSubmit={(event) => {
                
                handleSubmit(event, question.userAnswer);
              }}
            > */}
            <button id="answerButton" onClick={() => handleClick(question)}>
              <p id="userName">{question.userName}</p>
              <p id="bookTitle">{question.bookTitle}</p>
              <p id="date">{question.date}</p>
            </button>
            {/* <textarea type="text" name="teacherAnswer" />
              <input type="submit" /> */}
            {/* </form> */}
          </div>
        );
      })}
      <TAModal
        state={modalState}
        click={handleClick}
        submit={handleSubmit}
        answers={studentAnswers}
        selectedQA={selectedQA}
      />
    </div>
  );
}
