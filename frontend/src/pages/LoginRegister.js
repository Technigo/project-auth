import React, { useState, useEffect } from "react";
import LoginRegisterForm from "components/LoginRegisterForm";

const LoginRegister = () => {
  const [loginOrRegister, setLoginOrRegister] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginOrRegister = () => {
    {
      loginOrRegister === "login"
        ? setLoginOrRegister("register")
        : setLoginOrRegister("login");
    }
  };

  return (
    <>
      <h1>Please log in first:</h1>
      <LoginRegisterForm
        state={loginOrRegister}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      {loginOrRegister === "login" ? (
        <p>
          No account?
          <a href="#" onClick={handleLoginOrRegister}>
            Register!
          </a>
        </p>
      ) : (
        <p>
          Already registered?
          <a href="#" onClick={handleLoginOrRegister}>
            Login!
          </a>
        </p>
      )}
    </>
  );
};

export default LoginRegister;
