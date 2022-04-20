import React from "react";
import '../styles/TAModal.css'

export default function TAModal(props) {
  if (props.state === true) {
      let answers = props.selectedQA
      console.log(Date())
    return (
      <div id="tamodal">
         <form id="tamodal-form"
              onSubmit={(event) => {props.submit(event, props.selectedQA.userAnswer);
              }}
            >
                <h3 id="userName">Submitted by: {answers.userName}</h3>
                <p id="date">On: {answers.date}</p>
                <p id="bookTitle">{answers.bookTitle}</p>
                <p id="userAnswer">{answers.userAnswer}</p>
                <p id="userAnswer2">{answers.userAnswer2}</p>
                <p id="userAnswer3">{answers.userAnswer3}</p>
                <textarea id="textInput" type="text" name="teacherAnswer" placeholder="Type your response here! Click and drag to resize this box."/>
                <input id="submit" type="submit" />
        <button id="closeWindow" onClick={props.click}>Close Window</button>
        </form>
      </div>
    );
  } else {

      return(
          <div style={{display:"none"}}>
      </div>
  )
}
}
