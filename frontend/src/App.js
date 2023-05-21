import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { user } from 'reducer/user';
import { FirstPage } from 'components/FirstPage';
import { SecretPage } from 'components/SecretPage';

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer
  });
  
  const store = configureStore({ reducer });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/secret" element={<SecretPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
