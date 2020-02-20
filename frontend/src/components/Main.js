import React, { useState } from "react";
import { Register } from "./Register";
import { Login } from "./Login";

export const Main = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const addUser = event => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError(true);
    } else {
      setError(false);
      setSuccess(true);
    }

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(res => res.json())
      .then(() => {
        setName(name);
        setPassword(password);
        setEmail(email);
        setName("");
        setPassword("");
        setEmail("");
      });
  };

  return (
    <div>
      <button>Register</button>
      <button>Log in</button>
      <Register
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onClick={addUser}
      />
      {error && (
        <div>
          <p>Error! Try again!</p>
        </div>
      )}
      {success && <div>Thank you for your registration!</div>}
      <Login />
    </div>
  );
};
