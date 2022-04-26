import React from "react";
import { Navigate } from "react-router-dom"
import Userfront from "@userfront/react";
import "./styles/index.css";

Userfront.init("xbpm8jmn");

const SignupForm = Userfront.build({
  toolId: "krorbl",
});

function Home({ location }) {
    if (Userfront.accessToken()) {
      return (
        <Navigate to={{ pathname: "/dashboard", state: { from: location } }} />
      );
    }
    return (
      <div id="signupform">
        <SignupForm />
      </div>
    );
  }

  export default Home
