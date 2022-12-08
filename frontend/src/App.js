//API_URL: https://project-auth-fybh32gdwa-lz.a.run.app/
import React from 'react';
import { Register } from 'components/Register';
import { LogIn } from 'components/LogIn';
import { NotFound } from 'components/NotFound';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InnerWrapper, OuterWrapper } from 'components/GlobalStyles';
import { Home } from 'components/Home';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'components/reducers/user';

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({reducer});
export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <OuterWrapper> 
          <InnerWrapper>
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="login" element={<LogIn />} />
              <Route path="home" element={<Home />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </InnerWrapper>
        </OuterWrapper>
      </BrowserRouter>
    </Provider>
  );
}