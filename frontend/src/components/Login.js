import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { user } from "../reducers/user";

const SIGNUP_URL = "https://project-signup.herokuapp.com/users";
//"http://localhost:8080/users"
const LOGIN_URL = "https://project-signup.herokuapp.com/sessions";
//"http://localhost:8080/sessions"

export const Login = () => {
  const dispatch = useDispatch();
  //Using useSelector to access data from the redux store
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const loggedOutMessage = useSelector((store) => store.user.login.statusMessage);

  // useState is used to store the name and password entered by the user in the form
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Sending the response from the fetches for both the SIGNUP_URL & LOGIN_URL to the redux store if the fetch was successful
  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    );
    dispatch(user.actions.setUserId({ userId: loginResponse.id }));
    dispatch(user.actions.setName({ name: loginResponse.name }));
    dispatch(
      user.actions.setStatusMessage({ statusMessage: loginResponse.statusMessage })
    );
  };

  // If the fetch wasn't successful, because the user didn't give valid name or password when signing up or a when logging in the data sent didn't match was is stored in the database for that user e.g. name and password, then the access token is set to null and status message is that's returned in the json is sent to the redux store 
  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError.statusMessage }));
  };

  /* Handle sign up:
  1. prevents the page from refreshing after the form is submitted.
  2. Then does the fetch passing the name and password the user has inputted via the body as this is what the endpoint requires to create a new user.
  3. If the name and password aren't ok because they don't match what is required e.g the lenght is less than 5, then the throw is actioned.
  4. Otherwise if the fetch is successful then the data from the endpoint in server.js is returned in the json respons e.g. userId, accessToken, name and statusMessage.
  5. If not successful then the handleLoginFailed function is called and the redux store is updated with an access token that's null and the status message from the endpoint in server.js.
  6. Finally the setName and setPassword is cleared of the users name and password to an empty string.
  7. This is what happens also for the handleLogin function.
  */
  const handleSignup = (event) => {
    event.preventDefault();

    // send data to backend, for saving in DB
    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Signup failed. Please enter a valid name and password."
          );
        }
        return res.json();
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err))
      .finally(() => {
        setName("");
        setPassword("");
      });
  };

  // Handle log in
  const handleLogin = (event) => {
    event.preventDefault();

    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login failed. Please try again."); // throw redirects us to .catch
        }
        return res.json();
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err))
      .finally(() => {
        setName("");
        setPassword("");
      });
  };

  // If the user is successful (i.e. the accessToken has been created and successfully stored in the redux store) when logging in and signing in then the UserProfile component will be rendered. This is done because we have written the UserProfile tag in App.js, otherwise we could write it here and not in App.js
  if (accessToken) {
    return <></>;
  }

  return (
    <section>
      <form>
        <h1>Sign Up/Login</h1>
        <label> Name: </label>
        <input
          required
          minLength="5"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Min length 5 characters"
          required
          minLength="5"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="button-container">
          <button type="submit" onClick={handleSignup}>
            Sign up
          </button>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
        {!accessToken && <p>{loggedOutMessage}</p>}
      </form>
    </section>
  );
};