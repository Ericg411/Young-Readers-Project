import React from 'react'
import {QuestionBox} from "./questionBox"
import '../styles/QBox.css'

//set the current user data into the session storage
sessionStorage.setItem("currentUser", "Eric");

//define the QuestionBox class as a custom element (Web Component)
//Custom HTML tag for this element is set as question-box
window.customElements.define("question-box", QuestionBox);

export default function QBox() {
    return(
    <div>
        <div className="container">
            <div className="comments">
                <h3>Nested Comments</h3>
                <question-box level="0"></question-box>
            </div>
        </div>
    </div>
    )
}