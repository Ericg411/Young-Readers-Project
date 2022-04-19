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
              <Link to="/">Sign Up</Link>
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home({ location }) {
  if (Userfront.accessToken()) {
    return (
      <Navigate to={{ pathname: "/dashboard", state: { from: location } }} />
    );
  }
  return (
    <div>
      <h2>Sign Up</h2>
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

function Dashboard({ location }) {
  if (!Userfront.accessToken()) {
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
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

async function getAdminInfo() {
  const res = await window.fetch("http://localhost:8000/admin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Userfront.tokens.accessToken}`,
    },
  });
  console.log(res);
}
getAdminInfo();

async function getUserInfo() {
  const res = await window.fetch("http://localhost:8000/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Userfront.tokens.accessToken}`,
    },
  });
  console.log(res);
}
getUserInfo();

export default Access;
