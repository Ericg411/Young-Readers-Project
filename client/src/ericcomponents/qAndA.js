import React from 'react'
import '../styles/QandA.css'

export default function QandA() {
    return(
        <div id="qAndA">
            <h1>Student QandA</h1>
            <form id="input" action="http://localhost:5000/create" method="POST">
                <h3>What is the placeholder question one?</h3>
                <label for="a1">First Answer:</label>
                <textarea type="text" id="a1" name="userAnswer"/>
                <h3>What is the placeholder question two?</h3>
                <label for="a2">Second Answer:</label>
                <textarea type="text" id="a2" name="userAnswer2"/>
                <h3>What is the placeholder question three?</h3>
                <label for="a3">Third Answer:</label>
                <textarea type="text" id="a3" name="userAnswer3"/>
                <input type="submit"/>
            </form>
        </div>
    )
}