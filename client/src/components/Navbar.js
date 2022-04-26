import React from "react";
import { Link } from "react-router-dom";
import Userfront from "@userfront/react";
import "./styles/index.css";

function Navbar() {
  if (!Userfront.accessToken()) {
    return (
      <div className="nav-bar">
        <nav>
          <ul>
            <li>
              <Link to="/">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
