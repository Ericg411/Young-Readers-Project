import React, { useEffect, useState } from "react";

export default function TeacherAnswer() {
  const [studentAnswers, setStudentAnswers] = useState([]);
  function fetcher() {
    fetch(`http://localhost:5000/`)
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

  return (
    <div>
      <h1>Teacher Response Page</h1>
      {studentAnswers.map((question) => {
        return (
          <div id="studentAnswers" key={question._id}>
            <button>
              <p>{question.userAnswer}</p>
              <p>{question.userAnswer2}</p>
              <p>{question.userAnswer3}</p>
              <p>{question.date}</p>
            </button>
          </div>
        );
      })}
      <form action="http://localhost:5000/update" method="POST">
        <input type="submit"></input>
      </form>
    </div>
  );
}
