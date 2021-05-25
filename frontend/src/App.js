import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { SignIn } from "pages/SignIn";
import { SignUp } from "pages/SignUp";
import { Joke } from "pages/Joke";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f3ff;
`;

export const App = () => {
  return (
    <BrowserRouter>
      <MainContainer>
        <Switch>
          <Route path="/" exact>
            <SignIn />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/joke" exact>
            <Joke />
          </Route>
        </Switch>
      </MainContainer>
    </BrowserRouter>
  );
};
