import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { SignIn } from "pages/SignIn";
import { SignUp } from "pages/SignUp";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f3ff;
  // @media (min-width: 798px) {
  //   display: flex;
  //   flex-direction: row;
  //   height: 80vh;
  // }
`;

// const ImageFormContainer = styled.div`
// display: none;
// @media (min-width: 798px) {
//   display: flex;
//   flex-direction: row;
//   width: 50%;
//   height: 80%;
// }
// `;

// const Image = styled.div`
// @media (min-width: 798px) {
//   background-color: #f780b1;
//   border: 1px solid black;
//   #f780b1;
//   width: 100%;
//   height: 100%;
//   margin-right: 5px;
// }
// `;

export const App = () => {
  return (
    <BrowserRouter>
      <MainContainer>
        {/* <ImageFormContainer> */}
        {/* <Image></Image> */}
        <Switch>
          <Route path="/" exact>
            <SignIn />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
        </Switch>
        {/* </ImageFormContainer> */}
      </MainContainer>
    </BrowserRouter>
  );
};
