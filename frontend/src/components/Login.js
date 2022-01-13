import React, { useState, UseState } from "react";
import { useDispatch, batch } from "react-redux";

import { API_URL } from "../utils/urls";
import user from "../reducers/user";

const Login = () => {
  const [username, setUsername] = useState(""); // default value empty string
  const [password, setPassword] = useState(""); // default value empty string
  const [mode, setMode] = (useState = "signup"); // default value string signup

  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();

    // triggering the backend endpoint
    // app.post('/signup', async (reg, res) =>{
    // const { username, password }
    // })
    // in the body of the request we need to send username and password in our form below

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    // the argument string signup travels to urls.js and API_URL as a slug
    // The options variable should to be passed as the second argument in the fetch method
    fetch(API_URL("signup"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Redux is syncronous so it will update the store three times since we have three dispatches
          // We use batch in order to combine many dispatches that we want to send at the same time
          // So instead of sending 3 times it does it only once. batch takes only one argument which is a callback function
          // defensive programming: when the request is successful we should dispatch four actions
          batch(() => {
            // actions to send the userId, username and accessToken from the database to fill it with successful data
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            // To double check that it was successful and clear out errors if we had them previously
            dispatch(user.actions.setError(null));
          });
        } else {
          // defensive programming approach:
          // when we are logged in we should not be able to access the login route
          // and when we are not logged in we should now be able to access the main route
          // When request is not successful we clear out any user data that might have been there previously
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            // And we only return an error message
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  return (
    <>
      <label htmlFor="signup">Sign Up</label>
      <input
        id="signup"
        type="radio"
        checked={mode === "signup"}
        onChange={() => setMode("signup")}
      />
      <label htmlFor="signin">Sign In</label>
      <input
        id="signin"
        type="radio"
        checked={mode === "signin"}
        onChange={() => setMode("signin")}
      />
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username"></label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default Login;
