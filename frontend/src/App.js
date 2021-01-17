import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { user } from "Reducers/user";
import { Form } from "./Components/Form";
import { H1, MainWrapper, InnerWrapper } from "./styles/Styles";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <MainWrapper>
        <H1>Project: user authentication</H1>
        <InnerWrapper>
          <Form labelHeading="Username:" labelText="Password:" />
        </InnerWrapper>
      </MainWrapper>
    </Provider>
  );
};
