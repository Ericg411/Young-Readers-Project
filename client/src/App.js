import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import Bookrow from "./images/Bookrow.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <div id="bookrow">
          <img src={Bookrow} alt="Bookrow" />
        </div>
        <h1>Young Readers Literacy Project</h1>
        <Navbar />
        <div id="mainContentContainer">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
        </div>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
