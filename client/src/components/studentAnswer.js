import React, { useEffect, useState } from "react";
import SAModal from "./SAModal";
import "../styles/TAnswer.css";
import { useParams } from "react-router-dom";

export default function StudentAnswer(props) {
  const [modalState, setModalState] = useState(false);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [selectedQA, setSelectedQA] = useState("");

  const student = useParams();

  function handleClick(questionID) {
    if (modalState === true) {
      setModalState(false);
    } else {
      setSelectedQA(questionID);
      setModalState(true);
    }
  }

  function fetcher() {
    fetch(`http://localhost:8000/students/${props.user}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        json.reverse();
        setStudentAnswers(json);
      });
  }

  useEffect(() => {
    fetcher();
    studentAnswers.reverse();
    console.log(studentAnswers);
  }, []);

  function handleSubmit(event, data) {
    const url = "http://localhost:8000/update";
    //post body data
    const user = {
      userAnswer: data,
      teacherAnswer1: event.target[0].value,
      teacherAnswer2: event.target[1].value,
      teacherAnswer3: event.target[2].value,
      teacherAnswer: event.target[3].value,
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
      <h4 id="title">Student Answer Page</h4>
      {studentAnswers.map((question) => {
        return (
          <div id="studentAnswers" key={question._id}>
            <button id="answerButton" onClick={() => handleClick(question)}>
              <p id="userName">{question.userName}</p>
              <p id="bookTitle">{question.bookTitle}</p>
              <p id="bookAuthor">{question.bookAuthor}</p>
              <p id="date">{question.date}</p>
            </button>
          </div>
        );
      })}
      <SAModal
        state={modalState}
        click={handleClick}
        submit={handleSubmit}
        answers={studentAnswers}
        selectedQA={selectedQA}
      />
    </div>
  );
}
