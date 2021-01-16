import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// Reducers & Components
import { users } from './reducers/users';
import { Main } from './components/Main';

const reducer = combineReducers({ users: users.reducer });
const store = configureStore({ reducer });

// ----------------------------------------------------------------

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
