import React from 'react';
import { user } from './reducers/user';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { StartPage } from './pages/StartPage';
import { Secret } from './pages/Secret';

const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main>
          <Switch>
            <Route path='/' exact>
              <StartPage />
            </Route>
            <Route path='/secrets' exact>
              <Secret />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
};
