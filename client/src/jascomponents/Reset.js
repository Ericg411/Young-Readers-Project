import React from "react";
import Userfront from "@userfront/react";

Userfront.init("xbpm8jmn");

const PasswordResetForm = Userfront.build({
  toolId: "mrkrob",
});

function Reset() {
  return (
    <div>
      <h2>Password Reset</h2>
      <PasswordResetForm />
    </div>
  );
}

export default Reset