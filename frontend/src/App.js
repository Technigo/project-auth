import React from 'react';
import { Movies } from 'components/Movies';
import { Form } from 'components/Form';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { movie } from 'reducers/movie';

const reducer = combineReducers({
  movie: movie.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={ store }>
      <Form />
      <Movies />
    </Provider>
  );
};
