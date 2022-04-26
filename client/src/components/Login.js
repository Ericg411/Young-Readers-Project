import React from "react";
import Userfront from "@userfront/react";
import "./styles/index.css";

Userfront.init("xbpm8jmn");

const LoginForm = Userfront.build({
    toolId: "blblkl",
  });

  function Login() {
    return (
      <div id="loginform">
        <LoginForm />
      </div>
    );
  }

  export default Login
