import React from 'react'
import "./styles/index.css";
import "../styles/QandA.css"

export default function QandA(user) {
    return(
        <div id="qAndA">
            <h3>Student QandA</h3>
            <form id="input" action="http://localhost:8000/create" method="POST">
                <input type="hidden" value={user.user} name="userName"/>
                <h3>What is that book title?</h3>
                <input placeholder='Type the name of the book here.' type="text" id="bt" name="bookTitle"/>
                <h3>What is the placeholder question one?</h3>
                <textarea placeholder='Type your answer here! Click and drag to resize the box.' type="text" id="a1" name="userAnswer"/>
                <h3>What is the placeholder question two?</h3>
                <textarea placeholder='Type your answer here! Click and drag to resize the box.' type="text" id="a2" name="userAnswer2"/>
                <h3>What is the placeholder question three?</h3>
                <textarea placeholder='Type your answer here! Click and drag to resize the box.' type="text" id="a3" name="userAnswer3"/>
                <input type="submit"/>
            </form>
        </div>
    )
}
