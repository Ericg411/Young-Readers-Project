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

  function handleSubmit(event, data) {
    console.log(data);
    console.log(event.target[0].value);
    const url = 'http://localhost:5000/update'
    //post body data
    const user = {
      userAnswer: data,
      teacherAnswer: event.target[0].value
    }
    //request options
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res));
  }

  return (
    <div>
      <h1>Teacher Response Page</h1>
      {studentAnswers.map((question) => {
        return (
          <div id="studentAnswers" key={question._id}>
            <form
              onSubmit={(event) => {
                
                handleSubmit(event, question.userAnswer);
              }}
            >
              <p name="userAnswer">{question.userAnswer}</p>
              <p>{question.userAnswer2}</p>
              <p>{question.userAnswer3}</p>
              <p>{question.date}</p>
              <textarea type="text" name="teacherAnswer" />
              <input type="submit" />
            </form>
          </div>
        );
      })}
    </div>
  );
}
