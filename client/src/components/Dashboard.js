import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Userfront from "@userfront/react";
import TeacherAnswer from "./teacherAnswer";
import StudentAnswer from "./studentAnswer";
import QandA from "./qAndA";
import BookSearch from "./BookSearch.js"

Userfront.init("xbpm8jmn");

function Dashboard({ location }) {
  if (!Userfront.accessToken()) {
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  }
  const userData = JSON.stringify(Userfront.user, null, 2);

  if (Userfront.user.hasRole("admin")) {
    return (
      <div>
        <h2>
          Welcome, Young Reader: <span>{Userfront.user.name}</span>
        </h2>
        {/* <QandA user={Userfront.user.name}/> */}
        <TeacherAnswer />
        {/* <StudentAnswer user={Userfront.user.name} /> */}
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>
          Welcome, Young Reader: <span>{Userfront.user.name}</span>
        </h2>
        <BookSearch user={Userfront.user.name} />
        {/* <QandA user={Userfront.user.name}/> */}
        {/* <TeacherAnswer /> */}
        <StudentAnswer user={Userfront.user.name} />
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;

