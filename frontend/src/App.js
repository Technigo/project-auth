import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SignIn } from "components /SignIn";
import { Register } from "components /Register";
import { Summary } from "components /Summary";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* the login page */}
        <Route path="/signIn" exact>
          <SignIn />
        </Route>

        {/* the register page */}
        <Route path="/">
          <Register />
        </Route>

        {/* summary page */}
        <Route path="/summary">
          <Summary />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
