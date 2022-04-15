import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Userfront from "@userfront/react";

Userfront.init("xbpm8jmn");

const SignupForm = Userfront.build({
  toolId: "krorbl",
});

const LoginForm = Userfront.build({
  toolId: "blblkl",
});

const PasswordResetForm = Userfront.build({
  toolId: "mrkrob",
});

function Access() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/reset">Reset</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <SignupForm />
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}

function Reset() {
  return (
    <div>
      <h2>Password Reset</h2>
      <PasswordResetForm />
    </div>
  );
}

function Dashboard( {location }) {
    if (!Userfront.accessToken()) {
      return (
        <Navigate to={{ pathname: "/login", state: { from: location } }} />
      );
    }
    const userData = JSON.stringify(Userfront.user, null, 2);
    return (
      <div>
        <h2>Dashboard</h2>
        <pre>{userData}</pre>
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    );
  }


export default Access;

// Calling an endpoint with a JWT
//asnyc function getInfo() {
//     const res = await window.fetch("/your endpoint", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${Userfront.accessToken()}`,
//         },
//     });
//     console.log(res);
// }
// getInfo()
