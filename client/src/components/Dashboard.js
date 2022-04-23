import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Userfront from "@userfront/react";
import TeacherAnswer from "./teacherAnswer"
import StudentAnswer from "./studentAnswer";
import QandA from "./qAndA"
import Books from './Books'

Userfront.init("xbpm8jmn");

function Dashboard({ location }) {
    if (!Userfront.accessToken()) {
      return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
    }
    const userData = JSON.stringify(Userfront.user, null, 2);
    return (
      <div>
        <h2>Welcome, Young Reader: <span>{Userfront.user.name}</span></h2>
        {/* <QandA user={Userfront.user.name}/> */}
        {/* <TeacherAnswer /> */}
        <StudentAnswer user={Userfront.user.name}/>
        {/* <Books /> */}
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    );
  }

  export default Dashboard