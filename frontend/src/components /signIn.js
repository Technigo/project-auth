import React, { useState } from "react";

export const SignIn = () => {
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("Password");

  return (
    <section>
      <form onSubmit={event => event.preventDefault()}>
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
    </section>
  );
};
