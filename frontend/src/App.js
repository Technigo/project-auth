import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";

import user from "./reducers/user";
import thoughts from "./reducers/thoughts";

const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer,
});
const store = configureStore({ reducer });

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Provider>
      </BrowserRouter>
    </>
  );
};
