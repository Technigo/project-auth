import React, { useState } from "react";

const Start = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnClick = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify({ name: username, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUsername("");
        setPassword("");
      });
  };

  return (
    <>
      <h1>hi</h1>
      <form>
        <label>
          <p>Username:</p>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
          />
        </label>
        <label>
          <p>Password:</p>
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </label>
        <button type="submit" onClick={handleOnClick}>
          Sign up
        </button>
      </form>
    </>
  );
};

export default Start;
