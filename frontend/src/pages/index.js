import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from '../components/reusable/ProtectedRoute'
import Login from './login';
import Home from './home';
import NoMatch from './nomatch'

export default () => {
  return (
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        
        <Route component={NoMatch} />
      </Switch>
  );
};
