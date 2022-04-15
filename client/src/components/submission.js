import React from 'react'

export default function Submission() {
    setTimeout(() => {
        window.location.href = "http://localhost:3000/"
    }, 5000)
    return(
        <div>
            <h1>Thank you for your answers!</h1>
        </div>
    )
}