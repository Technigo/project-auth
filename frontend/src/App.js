import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { Main } from "./pages/Main"
import { SignIn } from "pages/SignIn";
import { SignUp } from "pages/SignUp";
import { Joke } from "pages/Joke";
import  user from "reducers/user";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f3ff;
`;

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MainContainer>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/joke" component={Joke} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </MainContainer>
      </Provider>
    </BrowserRouter>
  );
};
