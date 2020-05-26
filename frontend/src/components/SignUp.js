import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../reducers/user';
const SIGNUP_URL = "http://localhost:8080/users";

export const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleSignupSuccess = (loginResponse) => {
    // For debugging only
    const statusMessage = JSON.stringify(loginResponse);
    dispatch(user.actions.setStatusMessage({ statusMessage }));
    
    console.log('Success Success')
    // Save the login info
    dispatch(user.actions.setAccessToken({ accessToken: loginResponse.accessToken }));
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
  };

  const handleSignupFailed = (loginError) => {
    const statusMessage = JSON.stringify(loginError);
    dispatch(user.actions.setStatusMessage({ statusMessage }));
    console.log('error error')
    // Clear login values
    dispatch(user.actions.logout());
  };

  const handleSignup = (event) => {
    event.preventDefault();

    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({ name, password, email }),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (!res.ok) {
        setErrorMessage(true)
      } else {
        setErrorMessage(false)
        setSignUp(true)
        return (res.json())
      }
    })
    .then((json) => handleSignupSuccess(json))
    .catch((err) => handleSignupFailed(err));
  };

  if (signUp === false) {
    return (
      <div>
        <form onSubmit={handleSignup}>
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
            <button type="submit">Sign up</button>
          </label>
        </form>
        {errorMessage === true ? <p>Could not create user</p> : null}
      </div>
    );
  } else {
   return <h2>Registration completed, please log in</h2>
  }
};
