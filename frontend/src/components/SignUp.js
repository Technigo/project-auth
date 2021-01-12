import React, { useState } from "react";

const SignUp = ({ SIGNUP_URL }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    console.log(SIGNUP_URL);
    fetch(SIGNUP_URL, {
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
      <button type="submit">Sign up</button>
    </form>
  )
};

export default SignUp;