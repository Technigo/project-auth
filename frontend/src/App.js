import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SignIn } from "components /SignIn";
import { Register } from "components /Register";
import { Summary } from "components /Summary";
import styled from "styled-components/macro";
import img from "./components /images/img.jpg";

export const App = () => {
  return (
    <Div>
      <BrowserRouter>
        <Switch>
          {/* the login page */}
          <Route path="/SignIn" exact>
            <SignIn />
          </Route>

          {/* the register page */}
          <Route path="/" exact>
            <Register />
          </Route>

          {/* summary page */}
          <Route path="/Summary" exact>
            <Summary />
          </Route>
        </Switch>
      </BrowserRouter>
    </Div>
  );
};

const Div = styled.div`
  background: blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-image: url(${img});
  background-size: cover;
  width: 50vw;
  border: 2px solid #d14040;
  box-shadow: 5px 5px #f5c8b4;
`;
