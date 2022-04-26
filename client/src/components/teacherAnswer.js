import React, { useEffect, useState } from "react";
import TAModal from "./TAModal";
import "../styles/TAnswer.css";

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
        json.reverse();
        setStudentAnswers(json);
      });
  }

  useEffect(() => {
    fetcher();
    studentAnswers.reverse();
  }, []);

  const [searchData, setSearchData] = useState(studentAnswers);

  const searchItem = (query) => {
    if (!query) {
      setSearchData(studentAnswers);
      return;
    }
    query = query.toLowerCase();

    const finalResult = [];
    console.log(searchData);
    studentAnswers.forEach((item) => {
      if (item.userName.toLowerCase().indexOf(query) !== -1 
      || item.bookAuthor.toLowerCase().indexOf(query) !== -1
      ) 
      {
        finalResult.push(item);
      }
    });
    setSearchData(finalResult);
  };

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

  console.log(searchData);
  if (searchData.length === 0) {
    return (
      <div>
        <div>
          <input
            type="search"
            placeholder="Search by Book Title or User Name!"
            id="search"
            onChange={(e) => searchItem(e.target.value)}
          ></input>
        </div>
        <div id="studentAnswersMain">
          <h4 id="title">Teacher Response Page</h4>
          {studentAnswers.map((question) => {
            return (
              <div id="studentAnswers" key={question._id}>
                <button id="answerButton" onClick={() => handleClick(question)}>
                  <p id="userName">Young Reader: {question.userName}</p>
                  <p id="bookTitle">Title: {question.bookTitle}</p>
                  <p id="bookAuthor">Author: {question.bookAuthor}</p>
                  <p id="date">Date Completed: {question.date}</p>
                </button>
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
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <input
            type="search"
            placeholder="Search by Book Title or User Name!"
            id="search"
            onChange={(e) => searchItem(e.target.value)}
          ></input>
        </div>
        <div>Teacher Response</div>
        <div id="studentAnswersMain">
          {searchData.map((item) => {
            return (
              <div id="studentAnswers" key={item._id}>
                <button id="answerButton" onClick={() => handleClick(item)}>
                  <p id="userName">Young Reader: {item.userName}</p>
                  <p id="bookTitle">Title: {item.bookTitle}</p>
                  <p id="bookAuthor">Author: {item.bookAuthor}</p>
                  <p id="date">Date Completed: {item.date}</p>
                </button>
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
      </div>
    );
  }
}
