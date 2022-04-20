import React from "react";
import { Navigate } from "react-router-dom";
import Userfront from "@userfront/react";
import TeacherAnswer from "./teacherAnswer"
import QandA from "./qAndA"

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
        <TeacherAnswer />
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    );
  }

  export default Dashboard