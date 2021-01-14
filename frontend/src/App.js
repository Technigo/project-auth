import React, { useState } from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import styled from "styled-components/macro";

import { user } from "Reducers/user";
import { Form } from "./Components/Form";
import { LogIn } from "./Components/LogIn";
import { Button } from "./Components/Button";

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
  //const {userLogged, setUserLogged} = useState(false);
  const userLogged = false;

  return (
    <Provider store={store}>
      {userLogged === false ? (
        <Wrapper>
          <h1>Sign up or log in here!</h1>
          <InnerWrapper>
            <Form
              input="Log in"
              heading="Log in here:"
              labelHeading="Select a username:"
              labelText="Enter a password:"
            />
            {/* <Form
              input="Sign up"
              heading="Sign up here:"
              labelHeading="Enter username:"
              labelText="Enter password:"
            /> */}
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
