import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { user } from "Reducers/user";

import { Form } from "./components/Form";
import { LogIn } from "./pages/LogIn";
import { H1, MainWrapper, InnerWrapper } from "./styles/Styles";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <MainWrapper>
        <H1>User authentication</H1>
        <InnerWrapper>
          <Form labelHeading="Username:" labelText="Password:" />
        </InnerWrapper>
      </MainWrapper>
    </Provider>
  );
};
