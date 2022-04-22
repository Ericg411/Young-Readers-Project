import React from "react";

const BookCard = (props) => {
    return (
        <div className = "card-container">
            <img src = {props.image} alt = "" />
            <div className="desc" />
            <h2> Title: {props.title} </h2>
            <h3> Author: {props.author} </h3>
            <p>Published Data: {props.published === '0000' ? 'Not Available' : props.published} </p>
        </div>
    )
}

export default BookCard;
