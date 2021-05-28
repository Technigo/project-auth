import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import ProtectedRoute from '../components/ProtectedRoute';
import Login from './login';
import Home from './home';
import NoMatch from './nomatch';

export default () => {
  return (
    <Container component="main" maxWidth="xs">
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />

        <Route component={NoMatch} />
      </Switch>
    </Container>
  );
};
