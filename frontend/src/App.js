import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";

import { Main } from "Main";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="*">
          <h1>Error</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
