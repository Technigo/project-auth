import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'Components/Main';
import SignIn from 'Components/SignIn';
import NotFound from 'Components/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import recipes from 'reducers/recipes';
import user from 'reducers/user';
import { OuterWrapper, InnerWrapper } from 'Components/GlobalComponents';
import styled from 'styled-components';


const reducer = combineReducers({
  user: user.reducer,
  recipes: recipes.reducer
});
const store = configureStore({reducer});
export const App = () => {
  return (
    <OuterWrapper>
      <Header>🥑Menu picker</Header>
      <InnerWrapper>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<SignIn/>}></Route>
              <Route path='/' element={<Main/>}></Route>
              <Route path='*' element={<NotFound/>}></Route>
            </Routes>
          </BrowserRouter>
        </Provider>
    </InnerWrapper>
    </OuterWrapper>
  );
}


export const Header = styled.h1`
color: #464E2E;
font-family: 'Fredoka One', cursive;
font-size: 40px;
position: absolute;
margin-top: 5%;
margin-left: 1em;
`