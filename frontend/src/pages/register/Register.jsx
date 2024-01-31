import React from "react";
import Inputfield from "../../components/forms/Inputfield";

function Register() {
  return (
    <form>
      Register
      <div className="space-y-3">
        <Inputfield
          type="text"
          placeholder="Type your name"
          label="Your name"
          value={""}
          error=""
        />
        <Inputfield
          type="email"
          placeholder="Type your name"
          label="Your name"
          value={""}
          error=""
        />
        <Inputfield
          type="password"
          placeholder="Type your name"
          label="Your name"
          value={""}
          error=""
        />
      </div>
    </form>
  );
}

export default Register;
