import React, { useState } from "react";

const url = "http://localhost:5000/";

export const Register = () => {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(false);

  const handelRegisterSubmit = () => {
    // event.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  return (
    <section>
      <form onSubmit={event => event.preventDefault()}>
        {/* name */}
        <span className="input">
          <input
            className="name"
            type="text"
            onChange={event => setName(event.target.value)}
            value={name}
            required
          />
        </span>

        {/* email */}
        <span className="input">
          <input
            className="email"
            type="text"
            onChange={event => setEmail(event.target.value)}
            value={email}
            required
          />
        </span>

        {/* password */}
        <span className="input">
          <input
            className="password"
            type="text"
            onChange={event => setPassword(event.target.value)}
            value={password}
            required
          />
        </span>
      </form>
      <button className="btn" onClick={handelRegisterSubmit} type="submit">
        Submit
      </button>
    </section>
  );
};
