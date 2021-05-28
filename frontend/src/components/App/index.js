import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { Toaster } from 'react-hot-toast';
import store from '../../store';
import Pages from '../../pages';

export default () => {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline>
          <Pages />
        </CssBaseline>
      </Router>
      <Toaster />
    </Provider>
  );
};
