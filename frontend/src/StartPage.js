import React, { useState } from 'react'
import { LogIn } from "./components/LogIn"
import { SignUp } from "./components/SignUp"
import styled from "styled-components/macro"
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { user } from "./reducers/user";

const URL = "https://signinprojecttechnigo.herokuapp.com/users";

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer });


const StyledContainer = styled.div`
  background-color: none;
  border: #0000 solid 2px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`


export const StartPage = () => {

  return (
    <Provider store={store}>
      <StyledContainer>
        <LogIn />
        <SignUp />
      </StyledContainer>
    </Provider>
  )
}

