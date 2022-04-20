import React, { useState } from "react";
import BookCard from "./BookCard";

const BookList = (props) => {
    return
    <div className = "list">
        {props.books.map ((book, i) => {
            return <BookCard />
        }
        )}
    </div>    
}