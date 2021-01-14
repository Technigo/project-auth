import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@redux/toolkit";
import styled from "styled-components/macro";

import { user } from "reducers/user";
import { Form } from "./components/Form";
import { LogIn } from "./components/LogIn";
import { Button } from "./components/Button";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const App = () => {
  const username = false;
  const USER_URL = "http://localhost:8080/users";

  //const createUser = () => {
  //   fetch(USER_URL, {
  //     method: "POST",
  //     body: JSON.stringify({ username, email, password }),
  //     headers: { "Content-type": "application/json" },
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json;
  //       }
  //       throw "Couldn't create user"; //display errormessage from backend here
  //     })
  //     .then(json => {
  //       //Use redux here for setting the accesstoken from res, so something with json.accessToken
  //     });
  // };

  return (
    <Provider store={store}>
      {username === false ? (
        <Wrapper>
          <h1>Sign up or log in here!</h1>
          <InnerWrapper>
            <Form
              input="Log in"
              heading="Log in here:"
              labelHeading="Select a username:"
              labelText="Enter a password:"
            />
            <Form
              input="Sign up"
              heading="Sign up here:"
              labelHeading="Enter username:"
              labelText="Enter password:"
            />
          </InnerWrapper>
        </Wrapper>
      ) : (
        <Wrapper>
          <LogIn username="Holabandola" />
          <Button input="Sign out" />
        </Wrapper>
      )}
    </Provider>
  );
};
