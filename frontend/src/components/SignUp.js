import React, { useState } from "react";



export const SignUp = () => {
  const URL = "http://localhost:8080/users";
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ name, password, email }),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {res.json()})
    .then((json) => {console.log(json)})
    .catch((err) => {console.log("error:", err)});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="User name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            minLength="2"
          />
        </label>
        <label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength="4"
          />
        </label>
        <label>
          <button type="submit">Sign up!</button>
        </label>
      </form>
    </div>
  );
};
