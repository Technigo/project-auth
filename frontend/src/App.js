import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { user } from './reducer/user';
import { Container } from './lib/Container';
import { LoginForm } from './components/LoginForm';
import CreateUser from './components/CreateUser';
import { UserPage } from './components/UserPage';
import { UserStatus } from './components/UserStatus'

const reducer = combineReducers({ 
  user: user.reducer,
 });

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Container>
              <LoginForm>
              </LoginForm>
              <CreateUser />
            </Container>
          </Route>
          <Route path="/:id/user">
            <UserPage />
          </Route>
        </Switch> 

      </BrowserRouter>
    </Provider>
  )
}
