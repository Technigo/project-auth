import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { signIn } from "components/signIn";
import { register } from "components/register";
import { summary } from "components/summary";
export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* the login page */}
        <Route path="/" exact>
          <signIn />
        </Route>

        {/* the register page */}
        <Route path="/register">
          <register />
        </Route>

        {/* summary page */}
        <Route path="/summary">
          <summary />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
