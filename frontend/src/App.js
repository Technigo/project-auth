import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StartPage } from './pages/StartPage';
import { Secret } from './pages/Secret';

export const App = () => {
  return (
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
  );
};
