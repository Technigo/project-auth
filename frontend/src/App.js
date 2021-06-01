import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "@reduxjs/toolkit";

import user from "reducers/user";
import { Main } from "./pages/Main";
import { SignIn } from "pages/SignIn";
import { SignUp } from "pages/SignUp";
import { Joke } from "pages/Joke";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f2f3ff;
`;

const store = configureStore({ reducer });

const reducer = combineReducers({
  user: user.reducer,
});

const persistedStateJSON = localStorage.getItem("reduxState");
let persistedState = {};

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON)
};

const store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

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
