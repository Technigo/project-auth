import React, { useState } from "react";
import { Provider } from "react-redux";
import {
  configureStore,
  combineReducers,
} from "Reducers/node_modules/@reduxjs/toolkit";
import { user } from "Reducers/user";

import { Form } from "./Components/Form";
import { LogIn } from "./Components/LogIn";
import { H1, MainWrapper, InnerWrapper } from "./styles/Styles";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  const [userLogged, setUserLogged] = useState(false);

  return (
    <Provider store={store}>
      {userLogged === false ? (
        <MainWrapper>
          <H1>Sign up or log in here!</H1>
          <InnerWrapper>
            <Form
              input="Log in"
              heading="Log in here:"
              labelHeading="Select a username:"
              labelText="Enter a password:"
            />
          </InnerWrapper>
        </MainWrapper>
      ) : (
        <MainWrapper>
          <LogIn username="Holabandola" />
        </MainWrapper>
      )}
    </Provider>
  );
};
