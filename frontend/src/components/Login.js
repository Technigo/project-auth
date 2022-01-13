import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { API_URL } from "../utils/urls";
import user from "../reducers/user";

const Login = () => {
  const [username, setUsername] = useState(""); // default value empty string
  const [password, setPassword] = useState(""); // default value empty string
  const [mode, setMode] = useState("signup"); // default value string signup

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

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

    // the argument mode travels to urls.js and API_URL as a slug
    // The options variable should to be passed as the second argument in the fetch method
    fetch(API_URL(mode), options)
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
    // label is just informative, htmlFor so that we can connect to the input
    <>
      <div>
        <Link to="/">To '/' !</Link>
      </div>
      <label htmlFor="signup">Sign Up</label>
      <input
        id="signup" // connects to label so we can also click the text and not only radio button
        type="radio"
        checked={mode === "signup"} // this input should be checked/selected only if the mode is equal to signup
        onChange={() => setMode("signup")} // change handler to change the mode to signup when we click on it
      />
      <label htmlFor="signin">Sign In</label>
      <input
        id="signin"
        type="radio"
        checked={mode === "signin"}
        onChange={() => setMode("signin")}
      />
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
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
