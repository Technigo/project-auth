import React, { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const login = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setLoggedIn(true);
        } else {
          // think of what to display if loggin fails
          console.log("Not logged in");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {loggedIn ? (
        <div>
          <p>User logged in</p>
        </div>
      ) : (
        <div>
          <form onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor="usernameInput">username:</label>
            <input
              id="usernameInput"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="passwordInput">password:</label>
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Log in</button>
          </form>
        </div>
      )}
    </>
  );
};
