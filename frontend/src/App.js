import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'components/Main';
import Login from 'components/Login';
import NotFound from 'components/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import games from 'reducers/games';
import user from 'reducers/user';

const reducer = combineReducers({
  user: user.reducer,
  games: games.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Main />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

{/* 
  <Wrapper>
    <RegistrationForm />
    <SignInForm />
    <SignOutButton />
  </Wrapper> 
*/}