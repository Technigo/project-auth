import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { user } from "../reducers/user";

const SignUp = ({ SIGNUP_URL }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentials = (credentials) => {
    dispatch(user.actions.setAccessToken({ accessToken: credentials.accessToken }));
    dispatch(user.actions.setUserId({ userId: credentials.userId }));
  };

  const handleSignup = (event) => {
    event.preventDefault();
    console.log({ email, password });
    console.log(SIGNUP_URL);
    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          // eslint-disable-next-line
          throw "Signup failed";
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        handleCredentials(json);
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.error(error))
  };

  return (
    <section>
      <p>Not a member yet? Please sign up below.</p>
      <form onSubmit={handleSignup}>
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
    </section>
  )
};

export default SignUp;