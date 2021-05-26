import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';
import Pages from '../../pages';

export default () => {
  return (
    <Provider store={store}>
      <Router>
        <Pages />
      </Router>
    </Provider>
  );
};
