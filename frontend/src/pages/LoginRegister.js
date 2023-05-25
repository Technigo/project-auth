import React, { useState, useEffect } from "react";
import LoginRegisterForm from "components/LoginRegisterForm";
import styled from "styled-components";

const LoginRegister = ({ API_URL }) => {
  const [loginOrRegister, setLoginOrRegister] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (event, state) => {
    switch (state) {
      case "login":
        console.log("login");
        fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
            localStorage.setItem("token", data.response.accessToken);
            window.location.reload(); } else { console.log("fel!") }
          })
          .catch((error) => console.log(error))

        break;
      case "register":
        console.log("register");
        fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, email, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
            localStorage.setItem("token", data.response.accessToken);
            window.location.reload(); } else { console.log("fel!") }
          })
          .catch((error) => console.log(error));
        break;
    }
  };

  const handleLoginOrRegister = () => {
    {
      loginOrRegister === "login"
        ? setLoginOrRegister("register")
        : setLoginOrRegister("login");
    }
  };

  return (
    <>
    <StyledLogin> 
      <h1>Please log in to access the site ✨</h1>
      <LoginRegisterForm
        state={loginOrRegister}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleFormSubmit={handleFormSubmit}
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
      </StyledLogin>
    </>
  );
};

export default LoginRegister;

const StyledLogin = styled.div`
background-color: #869d7a;
font-size: 1.5 rem;
text-align: center;

h1 {
  font-size: 4rem;
}

p {
  font-size: 1.5rem;
}

a {
  font-size: 1.5rem;
  margin-left: 1rem;
  color: #ffb140;
}
`
