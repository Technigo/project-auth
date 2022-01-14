import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../utils/urls";
import user from "../reducers/user";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 20px;
  /* border: solid black 2px; */
  background-color: rgba(255, 255, 255, 0.063);
  backdrop-filter: blur(12px);
  --webkit-backdrop-filter: blur(12px);

  @media (min-width: 200px) {
    margin: 0 auto;
    max-width: 300px;
  }
`;

const RadioWrapper = styled.section`
  display: flex;
  justify-content: center;
  padding: 20px 20px;
  /* border: 2px solid red; */
  margin: 20px;
`;

const RadioButtons = styled.div`
  display: flex;
  padding: 0 10px;

  input {
    opacity: 0.5;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 100px;
    padding: 5px 10px;
    align-items: center;
    text-align: center;
    border: orange solid 2px;
    background-color: transparent;
    border-radius: 50px;
    cursor: pointer;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    transition: all 0.3s ease;
    margin-top: 30px;

    :hover {
      background-color: orange;
      transform: scale(1.1, 1.1);
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  /* border: 2px solid blue; */

  label {
    padding-bottom: 10px;
    text-align: center;
  }

  input {
    padding: 10px;
    border-radius: 50px;
    border: none;
    text-align: center;
  }
`;

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
    <Wrapper>
      <div>
        <Link to="/">To '/' !</Link>
      </div>
      <RadioWrapper>
        <RadioButtons>
          <label htmlFor="signup">Sign Up</label>
          <input
            id="signup" // connects to label so we can also click the text and not only radio button
            type="radio"
            checked={mode === "signup"} // this input should be checked/selected only if the mode is equal to signup
            onChange={() => setMode("signup")} // change handler to change the mode to signup when we click on it
          />
        </RadioButtons>
        <RadioButtons>
          <label htmlFor="signin">Sign In</label>
          <input
            id="signin"
            type="radio"
            checked={mode === "signin"}
            onChange={() => setMode("signin")}
          />
        </RadioButtons>
      </RadioWrapper>

      <Form onSubmit={onFormSubmit}>
        <InputWrapper>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            placeholder="enter your username..."
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        <button type="submit">Submit</button>
      </Form>
    </Wrapper>
  );
};
export default Login;
