import React, { useState } from "react";

const Login = ({ LOGIN_URL }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    console.log(LOGIN_URL);
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.error(error))
  };

  return (
    <section>
      <h1>Welcome to Max and Sandrine's app!</h1>
      <p>Already a member? Please enter your credentials below.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            required
            minLength="5"
            type="email"
            value={email}
            name="email"
            onChange={event => setEmail(event.target.value)} />
        </label>
        <label>
          Password:
          <input
            required
            minLength="5"
            type="text"
            value={password}
            onChange={event => setPassword(event.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>Not a member yet? Please sign up below.</p>
    </section>
  )
};

export default Login;